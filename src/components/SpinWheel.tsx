import { useState } from "react";
import { Button } from "@/components/ui/button";
import spinWheelImage from "@/assets/spin-wheel.jpg";
import WinPopup from "./WinPopup";

const SpinWheel = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [freeSpinsLeft, setFreeSpinsLeft] = useState(2);
  const [winTier, setWinTier] = useState<number | null>(null);
  const [winPrize, setWinPrize] = useState("");

  const generateRandomWin = () => {
    const random = Math.random();
    
    if (random < 0.45) return { tier: 1, prize: `${Math.floor(Math.random() * 50) + 10} SPIN` };
    if (random < 0.75) return { tier: 2, prize: `${Math.floor(Math.random() * 100) + 50} SPIN` };
    if (random < 0.90) return { tier: 3, prize: `${Math.floor(Math.random() * 250) + 100} SPIN` };
    if (random < 0.98) return { tier: 4, prize: `${Math.floor(Math.random() * 500) + 250} SPIN` };
    return { tier: 5, prize: `${Math.floor(Math.random() * 5000) + 1000} SPIN + NFT!` };
  };

  const handleSpin = (type: 'free' | 'premium') => {
    setIsSpinning(true);
    if (type === 'free' && freeSpinsLeft > 0) {
      setFreeSpinsLeft(prev => prev - 1);
    }
    
    setTimeout(() => {
      setIsSpinning(false);
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
      
      <div className="flex flex-col items-center space-y-4 p-4">
      
       <div className="flex items-baseline justify-center space-x-2 md:space-x-3 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gold animate-shimmer bg-gradient-to-r from-gold via-warning to-gold bg-[length:200%_100%] bg-clip-text ">
          JACKPOT:
        </h2>
        <div className="text-2xl md:text-3xl font-bold text-gold animate-bounce-gold">
          1,530,480.25
        </div>
      </div>

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

      {/* --- ACTION BUTTONS SECTION MODIFIED --- */}
      {/* Changed flex-col to flex, justify-center, items-start and space-y to space-x */}
      <div className="flex items-start justify-center w-full space-x-4 md:space-x-6">
        
        {/* Container for the free spin button and its text */}
        <div className="text-center space-y-2">
          <Button 
            variant="outline"
            size="lg"
            // Changed width from w-full to w-40 md:w-48
            className="w-40 md:w-48 h-12 bg-success/10 border-success text-success hover:bg-success hover:text-success-foreground disabled:opacity-50"
            disabled={freeSpinsLeft === 0 || isSpinning}
            onClick={() => handleSpin('free')}
          >
            {isSpinning ? "SPINNING..." : `FREE SPIN (${freeSpinsLeft})`}
          </Button>
          {freeSpinsLeft === 0 && (
            <p className="text-sm text-muted-foreground">Next in: 4h 12m</p>
          )}
        </div>

        <Button 
          variant="default"
          size="lg"
           // Changed width from w-full to w-40 md:w-48
          className="w-40 md:w-48 h-12 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-bold shadow-lg"
          disabled={isSpinning}
          onClick={() => handleSpin('premium')}
        >
           {isSpinning ? "SPINNING..." : "SPIN (50)"}
        </Button>
      </div>
      {/* --- END OF MODIFIED SECTION --- */}
    </div>
    </>
  );
};

export default SpinWheel;