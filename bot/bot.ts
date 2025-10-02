// ==================================================================================
// FILE: bot.ts (Run this locally with Node.js)
// ==================================================================================
import { ethers } from 'ethers';
import axios from 'axios';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// 1. CONTRACT ABI
const CONTRACT_ABI = [
  "function storeNumber(uint256 _number) public",
  "function incrementNumber() public",
  "function getNumber(address _user) public view returns (uint256)",
  "function getAllUsers() public view returns (address[])",
  "function getStats() public view returns (uint256 totalUsers, uint256 interactions, uint256 timestamp)",
  "event NumberStored(address indexed user, uint256 number, uint256 timestamp)",
  "event NumberIncremented(address indexed user, uint256 newNumber, uint256 timestamp)"
];

// 2. CONFIGURATION - Loads from your .env file
const CONFIG = {
  // Make sure your .env file has a value for RPC_URL
  rpcUrl: process.env.RPC_URL || 'https://rpc.ankr.com/celo',
  // Make sure your .env file has a value for CONTRACT_ADDRESS
  contractAddress: process.env.CONTRACT_ADDRESS || '',
  // Make sure your .env file has a value for OPENROUTER_API_KEY
  openRouterApiKey: process.env.OPENROUTER_API_KEY || '',
  aiModel: 'anthropic/claude-3.5-sonnet',
  // Make sure your .env file has a value for PRIVATE_KEYS (comma-separated)
  privateKeys: (process.env.PRIVATE_KEYS || '').split(',').map(pk => pk.trim()),
  behaviorSettings: {
    minDelayMs: 30000,
    maxDelayMs: 180000,
  }
};

// 3. TYPESCRIPT INTERFACES
interface WalletPersonality {
  address: string;
  name: string;
  background: string;
  tradingStyle: string;
  currentNumber: string;
  actionHistory: string[];
}

interface AIDecision {
  action: 'store' | 'increment' | 'wait';
  number?: number;
  reasoning: string;
}

// 4. AI-ENHANCED BOT CLASS
class AIEnhancedBot {
  private provider: ethers.JsonRpcProvider;
  private wallets: ethers.Wallet[];
  private contracts: ethers.Contract[];
  private personalities: WalletPersonality[];

  constructor() {
    this.provider = new ethers.JsonRpcProvider(CONFIG.rpcUrl);
    this.wallets = CONFIG.privateKeys.filter(pk => pk).map(pk => new ethers.Wallet(pk, this.provider)); // Filter out empty keys
    this.contracts = this.wallets.map(wallet => new ethers.Contract(CONFIG.contractAddress, CONTRACT_ABI, wallet));
    this.personalities = this.generatePersonalities();
    console.log(`🤖 AI-Enhanced Bot initialized with ${this.wallets.length} wallets`);
    this.displayPersonalities();
  }

  private generatePersonalities(): WalletPersonality[] {
    const names = ['Alex', 'Morgan', 'Jordan', 'Casey', 'Riley', 'Taylor'];
    const backgrounds = [
      'an experienced DeFi trader with a focus on long-term holds',
      'a day trader who loves quick profits and momentum plays',
      'a cautious investor who prefers round numbers and patterns',
      'a risk-taker who enjoys experimenting with unusual strategies',
      'an analytical trader who bases decisions on data and trends',
      'a social trader who follows community sentiment'
    ];
    const styles = ['conservative', 'aggressive', 'balanced', 'contrarian', 'trend-following', 'experimental'];
    return this.wallets.map((wallet, i) => ({
      address: wallet.address,
      name: names[i % names.length],
      background: backgrounds[i % backgrounds.length],
      tradingStyle: styles[i % styles.length],
      currentNumber: '0',
      actionHistory: []
    }));
  }

  private displayPersonalities() {
    console.log('\n👥 AI-Generated Personalities:\n');
    this.personalities.forEach((p, i) => {
      console.log(`  [${i}] ${p.name} (${p.address.slice(0, 8)}...) - Style: ${p.tradingStyle}`);
    });
  }

  private async askAI(personality: WalletPersonality, contractStats: any): Promise<AIDecision> {
    // ========== FIX IS HERE ==========
    // Changed `0n` to `BigInt(0)` for compatibility with older TS targets
    const gasPrice = (await this.provider.getFeeData()).gasPrice || BigInt(0);
    // =================================
    const gasPriceGwei = ethers.formatUnits(gasPrice, 'gwei');
    const prompt = `
      You are an AI persona controlling a crypto wallet. Your personality is:
      - Name: ${personality.name}
      - Background: ${personality.background}
      - Style: ${personality.tradingStyle}
      Your task is to interact with a simple smart contract. Here are the current on-chain stats:
      - Total Unique Users: ${contractStats.totalUsers}
      - Total Contract Interactions: ${contractStats.interactions}
      - Your Current Stored Number: ${personality.currentNumber}
      - Your Past Actions: ${personality.actionHistory.join(', ') || 'None'}
      - Current Gas Price: ${parseFloat(gasPriceGwei).toFixed(2)} gwei
      Based *only* on your personality and the data provided, decide your next action. Should you: 'store', 'increment', or 'wait'?
      Your response MUST be a single, valid JSON object with the fields: "action", "number" (only if action is 'store'), and "reasoning".
      Example for storing: {"action": "store", "number": 777, "reasoning": "As a risk-taker, I like lucky numbers."}
      Example for incrementing: {"action": "increment", "reasoning": "I am methodical, so I will slowly increase my number."}
      Example for waiting: {"action": "wait", "reasoning": "Gas is a bit high, so I will wait."}
    `;
    try {
      console.log(`\n🤔 Asking AI for a decision for ${personality.name}...`);
      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        { model: CONFIG.aiModel, messages: [{ role: 'user', content: prompt }], response_format: { type: "json_object" } },
        { headers: { 'Authorization': `Bearer ${CONFIG.openRouterApiKey}`, 'Content-Type': 'application/json' } }
      );
      const decision: AIDecision = JSON.parse(response.data.choices[0].message.content);
      return decision;
    } catch (error: any) {
      console.error(`❌ Error asking AI for ${personality.name}:`, error.response?.data || error.message);
      return { action: 'wait', reasoning: 'AI decision failed, waiting as a fallback.' };
    }
  }

  public async run() {
    if (this.wallets.length === 0) {
        console.error("❌ No valid private keys found. Please check your .env file.");
        return;
    }
    console.log('\n🚀 Starting AI Bot Main Loop... Press CTRL+C to stop.');
    while (true) {
      try {
        const stats = await this.contracts[0].getStats();
        const contractStats = { totalUsers: stats.totalUsers.toString(), interactions: stats.interactions.toString() };
        console.log(`\n📊 Current Contract Stats: ${contractStats.totalUsers} users, ${contractStats.interactions} total interactions.`);
        for (let i = 0; i < this.wallets.length; i++) {
          const personality = this.personalities[i];
          const contract = this.contracts[i];
          personality.currentNumber = (await contract.getNumber(personality.address)).toString();
          const decision = await this.askAI(personality, contractStats);
          console.log(`[${personality.name}] AI Decision: ${decision.action.toUpperCase()}. Reasoning: "${decision.reasoning}"`);
          let tx;
          try {
            if (decision.action === 'store' && decision.number !== undefined) {
              const num = Math.floor(decision.number);
              console.log(`[${personality.name}] ➡️ Sending transaction to STORE number ${num}...`);
              tx = await contract.storeNumber(num);
              personality.actionHistory.push(`store(${num})`);
            } else if (decision.action === 'increment') {
              console.log(`[${personality.name}] ➡️ Sending transaction to INCREMENT number...`);
              tx = await contract.incrementNumber();
              personality.actionHistory.push('increment');
            } else {
              console.log(`[${personality.name}] ➡️ WAITING as per AI decision.`);
            }
            if (tx) {
              await tx.wait();
              console.log(`[${personality.name}] ✅ Transaction confirmed! Hash: ${tx.hash}`);
            }
          } catch (txError: any) {
             console.error(`[${personality.name}] ❌ Transaction failed:`, txError.reason || txError.message);
          }
          const delay = (Math.random() * (CONFIG.behaviorSettings.maxDelayMs - CONFIG.behaviorSettings.minDelayMs)) + CONFIG.behaviorSettings.minDelayMs;
          console.log(`[${personality.name}] 🕒 Waiting for ${Math.round(delay / 1000)} seconds...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      } catch (error) {
        console.error("An error occurred in the main loop:", error);
        await new Promise(resolve => setTimeout(resolve, 60000));
      }
    }
  }
}

// 5. MAIN EXECUTION
async function main() {
  const bot = new AIEnhancedBot();
  bot.run();
}

main().catch(error => {
  console.error("FATAL: Failed to initialize and run bot:", error);
  process.exit(1);
});