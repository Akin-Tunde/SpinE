import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Coins, Crown, Gem, Star, Zap, X } from "lucide-react";

// The interface that makes this a TypeScript component
interface WinPopupProps {
  tier: number | null;
  prize: string;
  onClose: () => void;
}

const tierConfig = {
  1: { name: "TIER 1 WIN!", icon: Coins, bgColor: "bg-gradient-to-br from-gray-400 to-gray-600", textColor: "text-white", borderColor: "border-gray-400", glowColor: "shadow-gray-400/50" },
  2: { name: "TIER 2 WIN!", icon: Star, bgColor: "bg-gradient-to-br from-blue-400 to-blue-600", textColor: "text-white", borderColor: "border-blue-400", glowColor: "shadow-blue-400/50" },
  3: { name: "TIER 3 WIN!", icon: Gem, bgColor: "bg-gradient-to-br from-purple-400 to-purple-600", textColor: "text-white", borderColor: "border-purple-400", glowColor: "shadow-purple-400/50" },
  4: { name: "TIER 4 WIN!", icon: Crown, bgColor: "bg-gradient-to-br from-orange-400 to-orange-600", textColor: "text-white", borderColor: "border-orange-400", glowColor: "shadow-orange-400/50" },
  5: { name: "LEGENDARY TIER 5!", icon: Zap, bgColor: "bg-gradient-to-br from-red-400 via-pink-500 to-red-600", textColor: "text-white", borderColor: "border-red-400", glowColor: "shadow-red-400/50" }
};

const WinPopup = ({ tier, prize, onClose }: WinPopupProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let autoCloseTimer: NodeJS.Timeout;
    if (tier) {
      setIsVisible(true);
      autoCloseTimer = setTimeout(() => {
        handleClose();
      }, 4000);
    }
    return () => clearTimeout(autoCloseTimer);
  }, [tier]);
  
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  if (!tier) return null;

  const config = tierConfig[tier as keyof typeof tierConfig];
  const IconComponent = config.icon;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300 p-4 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      <Card className={`
        relative w-full max-w-sm overflow-hidden border-4 ${config.borderColor} ${config.bgColor} ${config.glowColor}
        transition-all duration-300 shadow-2xl
        ${isVisible ? 'animate-scale-in' : 'animate-scale-out'}
        ${tier === 5 ? 'animate-pulse' : ''}
      `}>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/10 text-white hover:bg-white/20 hover:text-white z-20"
          onClick={handleClose}
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </Button>

        {tier >= 4 && (
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-2 left-2 w-2 h-2 bg-yellow-300 rounded-full animate-bounce"></div>
            <div className="absolute top-4 right-4 w-1 h-1 bg-white rounded-full animate-ping"></div>
            <div className="absolute bottom-3 left-6 w-1.5 h-1.5 bg-yellow-200 rounded-full animate-bounce delay-150"></div>
            <div className="absolute bottom-2 right-2 w-1 h-1 bg-white rounded-full animate-ping delay-300"></div>
          </div>
        )}
        
        <div className="relative p-6 sm:p-8 text-center space-y-4">
          <div className={`flex justify-center ${tier === 5 ? 'animate-bounce' : ''}`}>
            <IconComponent className={`w-14 h-14 sm:w-16 sm:h-16 ${config.textColor} drop-shadow-lg`} />
          </div>
          
          <div className="space-y-2">
            <Badge className={`text-base sm:text-lg font-bold px-4 py-1.5 ${config.bgColor} ${config.textColor} border-2 border-white/30`}>
              {config.name}
            </Badge>
            <div className={`text-2xl sm:text-3xl font-bold ${config.textColor} drop-shadow-lg`}>
              {prize}
            </div>
          </div>

          {tier === 5 && (
            <div className="text-lg font-semibold text-yellow-200 animate-pulse pt-2">
              🎉 JACKPOT WINNER! 🎉
            </div>
          )}
        </div>

        {tier === 5 && (
          <div className="absolute inset-0 rounded-lg border-4 border-transparent bg-gradient-to-r from-red-400 via-yellow-400 to-red-400 bg-clip-border animate-spin-slow opacity-75"></div>
        )}
      </Card>
    </div>
  );
};

export default WinPopup;