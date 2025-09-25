import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wallet, Trophy, User, Coins, ShoppingCart, Info  } from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="flex items-center justify-between p-6 border-b border-border bg-card/50">
      <div className="flex items-center space-x-8">
        <div className="text-2xl font-bold text-primary">
          SpinGame
        </div>
        
        <div className="hidden md:flex space-x-6">
          <Link 
            to="/" 
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              location.pathname === "/" 
                ? "bg-primary text-primary-foreground" 
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <Coins className="w-4 h-4" />
            <span>Spin</span>
          </Link>
          
          <Link 
            to="/tournaments" 
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              location.pathname === "/tournaments" 
                ? "bg-primary text-primary-foreground" 
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Tournaments</span>
          </Link>
          
          <Link 
            to="/marketplace" 
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              location.pathname === "/marketplace" 
                ? "bg-primary text-primary-foreground" 
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Marketplace</span>
          </Link>
          
          <Link 
            to="/profile" 
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              location.pathname === "/profile" 
                ? "bg-primary text-primary-foreground" 
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <User className="w-4 h-4" />
            <span>My Profile</span>
          </Link>

<Link 
           to="/about" 
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              location.pathname === "/about" 
                ? "bg-primary text-primary-foreground" 
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <Info className="w-4 h-4" />
            <span>About</span>
          </Link>

        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 bg-gold/10 px-4 py-2 rounded-lg border border-gold/20">
          <Coins className="w-4 h-4 text-gold" />
          <span className="font-medium text-gold">1,250 SPIN</span>
        </div>
        
        <Button variant="outline" size="sm" className="flex items-center space-x-2">
          <Wallet className="w-4 h-4" />
          <span>0x12...aB</span>
        </Button>
      </div>
    </nav>
  );
};

export default Navigation;