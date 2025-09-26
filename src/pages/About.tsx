import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins, Image, Trophy, HelpCircle } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Navigation />
      
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="text-center mb-8 md:mb-12">
          <HelpCircle className="w-12 h-12 mx-auto text-primary mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold">How SpinGame Works</h1>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto">
            Win tokens, collect NFTs, and compete for massive prizes.
          </p>
        </div>

        {/* "How it Works" section remains the same */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Coins className="w-6 h-6 text-gold" />
                <span>1. Spin the Wheel</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                Use free daily spins or purchase premium spins to win <span className="font-semibold text-gold">SPIN tokens</span>. Higher tiers offer bigger rewards!
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Image className="w-6 h-6 text-secondary" />
                <span>2. Collect Rare NFTs</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                Win exclusive <span className="font-semibold text-secondary">SpinGame NFTs</span> of varying rarities by landing on the wheel's highest tiers.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Trophy className="w-6 h-6 text-primary" />
                <span>3. Compete in Tournaments</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                Compete in tournaments against other players for a chance to win massive prize pools of <span className="font-semibold text-primary">tokens and NFTs</span>.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* --- NEW SECTION ADDED HERE --- */}
        <div className="mt-12 md:mt-16 text-center">
            <h2 className="text-2xl font-bold">Reward Tiers</h2>
            <p className="text-muted-foreground mt-2 mb-6">The higher the tier, the better the prize.</p>
            
            {/* Tier Information Card */}
            <Card className="w-full max-w-2xl mx-auto p-2">
                <div className="grid grid-cols-3 md:grid-cols-5 gap-2 md:gap-4">
                {[
                    { name: 'TIER 1', label: "Common" },
                    { name: 'TIER 2', label: "Rare" },
                    { name: 'TIER 3', label: "Epic" },
                    { name: 'TIER 4', label: "Legendary" },
                    { name: 'TIER 5', label: "Mythic" }
                ].map((tier, index) => (
                    <div key={tier.name} className="text-center p-3 rounded-lg bg-muted/30 border border-border">
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
        {/* --- END OF NEW SECTION --- */}

        <div className="mt-12 md:mt-16 text-center">
            <h2 className="text-2xl font-bold">Ready to Play?</h2>
            <p className="text-muted-foreground mt-2">Connect your wallet and start spinning!</p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;