import { Link, useLocation } from "react-router-dom";
import { Home, Trophy, ShoppingCart, User, Info } from "lucide-react"; // Removed Info for this example
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button"; // Assuming you have a button component

const footerNavItems = [
 
   { href: "/tournaments", label: "Tournaments", icon: Trophy },
  { href: "/marketplace", label: "Market", icon: ShoppingCart },
  // Central item is handled separately
  { href: "/profile", label: "Profile", icon: User },
  { href: "/about", label: "About", icon: Info },
];

const Footer = () => {
  const location = useLocation();

  return (
    <footer className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-card border-t border-border z-50">
      <nav className="relative flex items-center justify-around h-full">
        {/* Left and Right Side Items */}
        {footerNavItems.map((item, index) => {
          const isActive = location.pathname === item.href;
          return (
            // Added a placeholder div to create space for the center button
            <>
              {index === 2 && <div className="w-16 h-16" />} 
              <Link
                key={item.label}
                to={item.href}
                className={cn(
                  "flex flex-col items-center justify-center space-y-1 w-full h-full transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <item.icon className="w-6 h-6" />
                <span className="text-xs">{item.label}</span>
              </Link>
            </>
          );
        })}
        
        {/* Central Floating Button */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-6">
           <Button
            asChild
            className="rounded-full w-16 h-16 bg-primary shadow-lg flex flex-col items-center justify-center"
          >
            <Link to="/">
                <Home className="w-7 h-7 text-primary-foreground" />
                <span className="text-xs text-primary-foreground mt-1">Play</span>
            </Link>
          </Button>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
