// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "./GameToken.sol";
import "./Treasury.sol";

// ============================================================================
// 3. SPIN WHEEL CONTRACT (Token-Only Version)
// ============================================================================
contract SpinWheel is VRFConsumerBaseV2, Ownable, ReentrancyGuard, Pausable {
    VRFCoordinatorV2Interface COORDINATOR;
    uint64 s_subscriptionId;
    bytes32 keyHash;
    uint32 callbackGasLimit = 250000;
    uint16 requestConfirmations = 3;
    uint32 numWords = 1;
    
    GameToken public gameToken;
    Treasury public treasury;

    uint256 public dailyFreeSpins = 3;
    uint256 public premiumSpinCost = 50 * 10**18;
    uint256 public maxDailyPremiumSpins = 20;

    // --- Jackpot System ---
    uint256 public jackpotPool;
    uint256 public jackpotContributionPercent = 100; // 100 = 1.00%
    uint256 public jackpotSeedAmount;
    uint8 public jackpotTier = 4; // Legendary tier wins

    struct RewardItem {
        address tokenAddress;
        uint256 amount;
        uint256 fallbackAmountInGameToken;
    }

    struct RewardTier {
        uint16 probability;
        RewardItem[] rewards;
    }
    RewardTier[5] public rewardTiers;
    
    struct UserData {
        uint256 lastSpinDay;
        uint8 dailySpinsUsed;
        uint8 dailyPremiumSpins;
    }
    mapping(address => UserData) public userData;
    mapping(uint256 => address) public spinRequests;
    mapping(uint256 => bool) public isPremiumSpin;
    
    event SpinRequested(address indexed user, uint256 requestId, bool isPremium);
    event SpinResult(address indexed user, uint256 requestId, uint8 tier, bool isPremium);
    event RewardTokenDepleted(address indexed token, address indexed user, uint256 amount);
    event JackpotWon(address indexed winner, uint256 amount);
    
    constructor(uint64 subscriptionId, address vrfCoordinator, bytes32 _keyHash, address _gameToken, address payable _treasury) 
        VRFConsumerBaseV2(vrfCoordinator) 
        Ownable(msg.sender) 
    {
        COORDINATOR = VRFCoordinatorV2Interface(vrfCoordinator);
        s_subscriptionId = subscriptionId;
        keyHash = _keyHash;
        gameToken = GameToken(_gameToken);
        treasury = Treasury(_treasury);
        _initializeRewardTiers();
    }

    // --- THIS IS THE CORRECTED FUNCTION ---
    function _initializeRewardTiers() private {
        // Instead of creating RewardTier structs in memory, we modify the storage variables directly.
        
        // Tier 0 (Common)
        rewardTiers[0].probability = 7750;
        rewardTiers[0].rewards.push(RewardItem(address(gameToken), 1 * 10**18, 0));

        // Tier 1 (Uncommon)
        rewardTiers[1].probability = 1500;
        rewardTiers[1].rewards.push(RewardItem(address(gameToken), 10 * 10**18, 0));

        // Tier 2 (Rare)
        rewardTiers[2].probability = 500;
        rewardTiers[2].rewards.push(RewardItem(address(gameToken), 25 * 10**18, 0));

        // Tier 3 (Epic)
        rewardTiers[3].probability = 200;
        rewardTiers[3].rewards.push(RewardItem(address(gameToken), 50 * 10**18, 0));
        
        // Tier 4 (Legendary)
        rewardTiers[4].probability = 50;
        rewardTiers[4].rewards.push(RewardItem(address(gameToken), 100 * 10**18, 0));
    }
    
    function spin() external nonReentrant whenNotPaused {
        _handleSpin(false, 1);
    }
    
    function premiumSpin(uint256 amount) external nonReentrant whenNotPaused {
        _handleSpin(true, amount);
    }

    function _handleSpin(bool isPremium, uint256 amount) private {
        UserData storage user = userData[msg.sender];
        _updateDailyData(msg.sender);

        if (isPremium) {
            require(amount > 0, "Amount must be > 0");
            require(user.dailyPremiumSpins + amount <= maxDailyPremiumSpins, "Exceeds daily premium limit");
            user.dailyPremiumSpins += uint8(amount);

            uint256 totalCost = premiumSpinCost * amount;
            uint256 contribution = (totalCost * jackpotContributionPercent) / 10000;
            uint256 burnAmount = totalCost - contribution;
            
            gameToken.transferFrom(msg.sender, address(this), contribution);
            jackpotPool += contribution;
            
            if (burnAmount > 0) {
                gameToken.burnFrom(msg.sender, burnAmount);
            }
        } else {
            require(user.dailySpinsUsed < dailyFreeSpins, "Daily free spins used");
            user.dailySpinsUsed++;
        }

        for (uint i = 0; i < amount; i++) {
            uint256 requestId = COORDINATOR.requestRandomWords(keyHash, s_subscriptionId, requestConfirmations, callbackGasLimit, numWords);
            spinRequests[requestId] = msg.sender;
            isPremiumSpin[requestId] = isPremium;
            emit SpinRequested(msg.sender, requestId, isPremium);
        }
    }
    
    function fulfillRandomWords(uint256 requestId, uint256[] memory randomWords) internal override {
        address user = spinRequests[requestId];
        require(user != address(0), "Invalid request");
        
        uint256 randomNumber = randomWords[0] % 10000;
        uint8 winningTier = _determineWinningTier(randomNumber);
        bool premium = isPremiumSpin[requestId];
        
        if (winningTier == jackpotTier) {
            uint256 jackpotWinnings = jackpotPool;
            if (jackpotWinnings > 0) {
                jackpotPool = jackpotSeedAmount;
                treasury.distributeReward(user, address(gameToken), jackpotWinnings);
                emit JackpotWon(user, jackpotWinnings);
            }
        }

        RewardTier storage tier = rewardTiers[winningTier];
        for (uint i = 0; i < tier.rewards.length; i++) {
            RewardItem memory item = tier.rewards[i];
            
            uint256 amountToReward = item.amount;
            if (premium) { amountToReward = amountToReward * 120 / 100; } // 20% bonus for premium
            
            if (amountToReward > 0) {
                bool success = treasury.distributeReward(user, item.tokenAddress, amountToReward);
                if (!success && item.fallbackAmountInGameToken > 0) {
                    emit RewardTokenDepleted(item.tokenAddress, user, amountToReward);
                    uint256 fallbackAmount = item.fallbackAmountInGameToken;
                    if (premium) { fallbackAmount = fallbackAmount * 120 / 100; }
                    treasury.distributeReward(user, address(gameToken), fallbackAmount);
                }
            }
        }
        
        delete spinRequests[requestId];
        delete isPremiumSpin[requestId];
        emit SpinResult(user, requestId, winningTier, premium);
    }
    
    function _determineWinningTier(uint256 randomNumber) private view returns (uint8) {
        uint256 cumulative = 0;
        for (uint8 i = 0; i < rewardTiers.length; i++) {
            cumulative += rewardTiers[i].probability;
            if (randomNumber < cumulative) { return i; }
        }
        return 0;
    }

    function _updateDailyData(address user) private {
        uint256 currentDay = block.timestamp / 86400;
        if (userData[user].lastSpinDay != currentDay) {
            userData[user].lastSpinDay = currentDay;
            userData[user].dailySpinsUsed = 0;
            userData[user].dailyPremiumSpins = 0;
        }
    }

    function setJackpotParameters(uint256 _contributionPercent, uint256 _seedAmount) external onlyOwner {
        require(_contributionPercent <= 1000, "Fee too high"); // Max 10%
        jackpotContributionPercent = _contributionPercent;
        jackpotSeedAmount = _seedAmount;
    }
}