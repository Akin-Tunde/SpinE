import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import spinWheelImage from "@/assets/spin-wheel.jpg";
import WinPopup from "./WinPopup";

const SpinWheel = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [freeSpinsLeft, setFreeSpinsLeft] = useState(2);
  const [winTier, setWinTier] = useState<number | null>(null);
  const [winPrize, setWinPrize] = useState("");

  const generateRandomWin = () => {
    const random = Math.random();
    
    // Different probabilities for each tier
    if (random < 0.45) {
      return { tier: 1, prize: `${Math.floor(Math.random() * 50) + 10} SPIN` };
    } else if (random < 0.75) {
      return { tier: 2, prize: `${Math.floor(Math.random() * 100) + 50} SPIN` };
    } else if (random < 0.90) {
      return { tier: 3, prize: `${Math.floor(Math.random() * 250) + 100} SPIN` };
    } else if (random < 0.98) {
      return { tier: 4, prize: `${Math.floor(Math.random() * 500) + 250} SPIN` };
    } else {
      return { tier: 5, prize: `${Math.floor(Math.random() * 5000) + 1000} SPIN + NFT!` };
    }
  };

  const handleSpin = (type: 'free' | 'premium') => {
    setIsSpinning(true);
    if (type === 'free' && freeSpinsLeft > 0) {
      setFreeSpinsLeft(prev => prev - 1);
    }
    
    // Simulate spin duration
    setTimeout(() => {
      setIsSpinning(false);
      
      // Generate random win after spin completes
      const win = generateRandomWin();
      setWinTier(win.tier);
      setWinPrize(win.prize);
    }, 3000);
  };

  const handleWinPopupClose = () => {
    setWinTier(null);
    setWinPrize("");
  };

  return (
    <>
      <WinPopup 
        tier={winTier} 
        prize={winPrize} 
        onClose={handleWinPopupClose} 
      />
      
      {/* Added padding for mobile view */}
      <div className="flex flex-col items-center space-y-4 p-4">
      
      {/* Jackpot Display - Made text responsive */}
       <div className="flex items-baseline justify-center space-x-2 md:space-x-3 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gold animate-shimmer bg-gradient-to-r from-gold via-warning to-gold bg-[length:200%_100%] bg-clip-text ">
          JACKPOT:
        </h2>
        <div className="text-2xl md:text-3xl font-bold text-gold animate-bounce-gold">
          1,530,480.25
        </div>
      </div>

      {/* Spin Wheel - Made size responsive */}
      <div className="relative">
        <div className={`w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden animate-glow ${isSpinning ? 'animate-spin-slow' : ''}`}>
          <img 
            src={spinWheelImage} 
            alt="Spin Wheel" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 md:w-4 md:h-4 bg-gold rounded-full border-2 border-gold-foreground shadow-lg"></div>
        </div>
      </div>

      {/* Action Buttons - Stacked on mobile, row on desktop */}
      <div className="flex flex-col md:flex-row items-center w-full max-w-xs md:max-w-none md:w-auto space-y-4 md:space-y-0 md:space-x-6">
        <div className="text-center space-y-2 w-full md:w-auto">
          <Button 
            variant="outline"
            size="lg"
            className="w-full md:w-48 h-12 bg-success/10 border-success text-success hover:bg-success hover:text-success-foreground disabled:opacity-50"
            disabled={freeSpinsLeft === 0 || isSpinning}
            onClick={() => handleSpin('free')}
          >
            {isSpinning ? "SPINNING..." : `SPIN FOR FREE (${freeSpinsLeft} left)`}
          </Button>
          {freeSpinsLeft === 0 && (
            <p className="text-sm text-muted-foreground">Next free in: 4h 12m</p>
          )}
        </div>

        <Button 
          variant="default"
          size="lg"
          className="w-full md:w-48 h-12 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-bold shadow-lg"
          disabled={isSpinning}
          onClick={() => handleSpin('premium')}
        >
           {isSpinning ? "SPINNING..." : "SPIN (50 SPIN)"}
        </Button>
      </div>

      {/* Tier Information - Responsive grid */}
      <Card className="w-full max-w-md md:max-w-2xl p-2">
        <div className="grid grid-cols-3 md:grid-cols-5 gap-2 md:gap-4">
          {[
              { name: 'TIER 1', label: "Common" },
              { name: 'TIER 2', label: "Rare" },
              { name: 'TIER 3', label: "Epic" },
              { name: 'TIER 4', label: "Legendary" },
              { name: 'TIER 5', label: "Mythic" }
          ].map((tier, index) => (
            <div key={tier.name} className="text-center p-2 rounded-lg bg-muted/30 border border-border">
              <div className="font-semibold text-xs md:text-sm text-muted-foreground">{tier.name}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {tier.label}
                {index === 4 && " + Jackpot"}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
    </>
  );
};

export default SpinWheel;