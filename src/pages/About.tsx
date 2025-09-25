import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins, Image, Trophy, HelpCircle } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Navigation />
      
      <div className="container mx-auto px-6 ">
        <div className="text-center mb-10">
          <HelpCircle className="w-12 h-12 mx-auto text-primary mb-4" />
          <h1 className="text-4xl font-bold">How SpinGame Works</h1>
          <p className="text-muted-foreground mt-2">
            Win tokens, collect NFTs, and compete.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1: Spin to Win */}
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

          {/* Card 2: Collect NFTs */}
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

          {/* Card 3: Compete in Tournaments */}
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

        <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold">Ready?</h2>
            <p className="text-muted-foreground mt-2">Connect your wallet and start spinning!</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;