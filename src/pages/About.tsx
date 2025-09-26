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
          <h1 className="text-3xl md:text-4xl font-bold">How It Works</h1>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto">
            Your guide to winning tokens, NFTs, and more.
          </p>
        </div>

        {/* "How it Works" section with reduced text */}
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
                Use daily free spins or premium spins to win <span className="font-semibold text-gold">SPIN tokens</span>. Higher tiers mean bigger rewards.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Image className="w-6 h-6 text-secondary" />
                <span>2. Collect NFTs</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                Land on high tiers to win exclusive <span className="font-semibold text-secondary">SpinGame NFTs</span> of varying rarities.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Trophy className="w-6 h-6 text-primary" />
                <span>3. Join Tournaments</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                Join tournaments to compete for massive prize pools of <span className="font-semibold text-primary">tokens and NFTs</span>.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Reward Tiers section with reduced text */}
        <div className="mt-12 md:mt-16 text-center">
            <h2 className="text-2xl font-bold">Reward Tiers</h2>
            <p className="text-muted-foreground mt-2 mb-6">Higher tiers yield better prizes.</p>
            
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

        {/* Final CTA with reduced text */}
        <div className="mt-12 md:mt-16 text-center">
            <h2 className="text-2xl font-bold">Ready to Play?</h2>
            <p className="text-muted-foreground mt-2">Connect your wallet to start winning!</p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;