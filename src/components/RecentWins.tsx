import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Coins, Image } from "lucide-react";
import { useState, useEffect } from "react";

const recentWins = [
  { player: "Alex", amount: "10,000 SPIN", type: "tokens", time: "2m ago" },
  { player: "Jane", amount: "Rare NFT 'Dragon's Breath'", type: "nft", time: "5m ago" },
  { player: "0x89...42", amount: "1,250 SPIN", type: "tokens", time: "8m ago" },
  { player: "Mike", amount: "Epic NFT", type: "nft", time: "12m ago" },
  { player: "VeryLongPlayerNameToTestTruncation", amount: "500 SPIN", type: "tokens", time: "15m ago" },
  { player: "CryptoKing", amount: "25,000 SPIN", type: "tokens", time: "20m ago" },
  { player: "NFTQueen", amount: "Legendary NFT", type: "nft", time: "22m ago" },
 ];

 const RecentWins = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Logic to scroll by 3 items, ensures we don't always start at 0
      setCurrentIndex(prevIndex => (prevIndex + 3) % recentWins.length);
    }, 5000); // Changes every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const getDisplayedWins = () => {
    const wins = [];
    for (let i = 0; i < 3; i++) {
      wins.push(recentWins[(currentIndex + i) % recentWins.length]);
    }
    return wins;
  };

 return (
    // This `w-full max-w-sm` is the key to its excellent responsiveness.
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-lg">
          <Trophy className="w-5 h-5 text-gold" />
          <span>Recent Wins</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 overflow-hidden">
        {getDisplayedWins().map((win, index) => (
          // By changing the key, we tell React to re-render the element, re-triggering the animation
          <div 
            key={currentIndex + index} 
            className="flex items-center justify-between p-3 rounded-lg bg-muted/30 animate-fade-in"
          >
            {/* Added `min-w-0` to allow child elements to be truncated */}
            <div className="flex items-center space-x-3 min-w-0">
              {win.type === "tokens" ? (
                <Coins className="w-4 h-4 text-gold flex-shrink-0" />
              ) : (
                <Image className="w-4 h-4 text-secondary flex-shrink-0" />
              )}
              {/* Added `min-w-0` here as well */}
              <div className="min-w-0">
                {/* KEY CHANGE: Added `truncate` to prevent layout breaking */}
                <div className="font-medium text-sm truncate">{win.player}</div>
                <div className="text-xs text-muted-foreground">{win.time}</div>
              </div>
            </div>
            {/* KEY CHANGE: Added `truncate` to prevent layout breaking */}
            <div className={`text-sm font-medium pl-2 truncate ${
              win.type === "tokens" ? "text-gold" : "text-secondary"
            }`}>
              {win.amount}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentWins;