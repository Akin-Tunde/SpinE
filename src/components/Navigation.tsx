import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAccount } from "wagmi";
import { ConnectButton } from "@/components/ConnectButton";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Trophy, User, Coins, ShoppingCart, Info, Menu, BarChart } from "lucide-react";
import { cn } from "@/lib/utils";

// Define nav links in an array to avoid repetition
const navLinks = [
  { href: "/", label: "Spin", icon: Coins },
  { href: "/tournaments", label: "Tournaments", icon: Trophy },
  { href: "/marketplace", label: "Marketplace", icon: ShoppingCart },
  { href: "/leaderboard", label: "Leaderboard", icon: BarChart },
  { href: "/profile", label: "My Profile", icon: User },
  { href: "/about", label: "About", icon: Info },
];

const Navigation = () => {
  const location = useLocation();
  const { isConnected } = useAccount();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close the mobile menu automatically on navigation
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const NavLink = ({ href, label, icon: Icon, className }: (typeof navLinks)[0] & { className?: string }) => (
    <Link
      to={href}
      className={cn(
        "flex items-center space-x-2 transition-colors",
        location.pathname === href
          ? "text-primary font-semibold"
          : "text-muted-foreground hover:text-foreground",
        className,
      )}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </Link>
  );

  return (
    <nav className="sticky top-0 z-40 flex items-center justify-between px-4 md:px-6 py-3 border-b border-border bg-card/80 backdrop-blur-sm">
      <div className="flex items-center space-x-4 md:space-x-8">
        <Link to="/" className="text-2xl font-bold text-primary">
          SpinGame
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-2 md:space-x-4">
        {isConnected && (
          <div className="hidden sm:flex items-center space-x-2 bg-gold/10 px-3 py-1.5 rounded-lg border border-gold/20">
            <Coins className="w-4 h-4 text-gold" />
            <span className="font-medium text-gold text-sm">1,250 SPIN</span>
          </div>
        )}
        <ConnectButton />

        {/* Mobile Menu Trigger */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="w-5 h-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px]">
            <div className="flex flex-col h-full">
              <div className="p-4 border-b">
                <Link to="/" className="text-2xl font-bold text-primary">
                  SpinGame
                </Link>
              </div>
              <div className="flex flex-col space-y-4 p-4">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <NavLink {...link} className="text-lg p-2 rounded-md" />
                  </SheetClose>
                ))}
              </div>
              {isConnected && (
                <div className="mt-auto p-4 border-t">
                  <div className="flex items-center space-x-2 bg-gold/10 px-3 py-2 rounded-lg border border-gold/20">
                    <Coins className="w-5 h-5 text-gold" />
                    <span className="font-bold text-gold text-base">1,250 SPIN</span>
                  </div>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navigation;