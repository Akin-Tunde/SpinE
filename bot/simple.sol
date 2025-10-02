
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleStorage {
    // Mapping to store each user's number
    mapping(address => uint256) public userNumbers;

    // Array to track all unique users who have interacted
    address[] public users;
    // Mapping to efficiently check if a user has already been added to the `users` array
    mapping(address => bool) public hasInteracted;

    // A global counter for all state-changing interactions
    uint256 public totalInteractions;

    // Event emitted when a number is stored or updated
    event NumberStored(address indexed user, uint256 number, uint256 timestamp);
    // Event emitted when a user's number is incremented
    event NumberIncremented(address indexed user, uint256 newNumber, uint256 timestamp);

    function storeNumber(uint256 _number) public {
        userNumbers[msg.sender] = _number;

        // Add user to the list only on their first interaction
        if (!hasInteracted[msg.sender]) {
            users.push(msg.sender);
            hasInteracted[msg.sender] = true;
        }

        totalInteractions++;
        emit NumberStored(msg.sender, _number, block.timestamp);
    }

    function incrementNumber() public {
        userNumbers[msg.sender]++;

        // Add user to the list only on their first interaction
        if (!hasInteracted[msg.sender]) {
            users.push(msg.sender);
            hasInteracted[msg.sender] = true;
        }

        totalInteractions++;
        emit NumberIncremented(msg.sender, userNumbers[msg.sender], block.timestamp);
    }

    function getNumber(address _user) public view returns (uint256) {
        return userNumbers[_user];
    }

    function getAllUsers() public view returns (address[] memory) {
        return users;
    }

    function getTotalUsers() public view returns (uint256) {
        return users.length;
    }

    function getStats() public view returns (
        uint256 totalUsers,
        uint256 interactions,
        uint256 timestamp
    ) {
        return (users.length, totalInteractions, block.timestamp);
    }
}