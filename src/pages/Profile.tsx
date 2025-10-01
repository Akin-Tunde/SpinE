// src/pages/Profile.tsx

import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Copy, Share2, Trophy, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react"; // <-- Import useEffect for logging
import { useAccount } from "wagmi";
import { ConnectButton } from "@/components/ConnectButton";
import Footer from "@/components/Footer";
import { useFarcasterUser } from "@/hooks/use-farcaster-user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const playerStats = {
  totalSpins: 452,
  premiumSpins: 89,
  totalWinnings: "10,240 SPIN",
  referralCode: "ALEX123",
  referrals: 5,
  referralEarnings: "500 SPIN",
};

const Profile = () => {
  const { address, isConnected, connector } = useAccount();
  const [isCopied, setIsCopied] = useState(false);
  const { user: farcasterUser } = useFarcasterUser();

  const isFarcasterConnected =
    isConnected && connector?.id === "farcasterMiniApp" && farcasterUser;

  // --- DEBUGGING LOGS ---
  // This will run every time the component re-renders
  useEffect(() => {
    console.group("[Debug] Profile Page State");
    console.log("Wallet Is Connected:", isConnected);
    console.log("Connector:", connector);
    console.log("Connector ID:", connector?.id);
    console.log("Farcaster User Object:", farcasterUser);
    console.log("FINAL CHECK -> Is Farcaster Connected:", isFarcasterConnected);
    console.groupEnd();
  });


  const copyReferralCode = () => {
    navigator.clipboard.writeText(playerStats.referralCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background flex flex-col pb-20 md-pb-0">
        <Navigation />
        <div className="flex-grow container mx-auto px-4 md-px-6 py-8 flex items-center justify-center">
          <Card className="max-w-md w-full mx-auto p-6 md-p-8 text-center">
            <CardHeader>
              <AlertTriangle className="w-12 h-12 text-warning mx-auto" />
              <CardTitle className="mt-4 text-xl md-text-2xl">Please Connect Your Wallet</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">You need to connect to view your profile and collection.</p>
              <ConnectButton />
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 md-pb-0">
      <Navigation />

      <div className="container mx-auto px-4 md-px-6 py-8">
        <div className="flex flex-row items-center gap-4 mb-8">
          {isFarcasterConnected ? (
            <Avatar className="h-14 w-14">
              <AvatarImage
                src={farcasterUser.pfpUrl}
                alt={farcasterUser.displayName || farcasterUser.username}
              />
              <AvatarFallback>
                <User className="h-7 w-7" />
              </AvatarFallback>
            </Avatar>
          ) : (
            <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-7 h-7 text-white" />
            </div>
          )}

          <div className="min-w-0">
            {isFarcasterConnected ? (
              <>
                <h1 className="text-xl md-text-2xl font-bold">
                  {farcasterUser.displayName || farcasterUser.username}
                </h1>
                <p className="text-sm text-muted-foreground -mt-1">My Profile</p>
              </>
            ) : (
              <h1 className="text-xl md-text-2xl font-bold">My Profile</h1>
            )}
            <p className="text-muted-foreground font-mono text-sm break-all mt-1">
              {address ? `${address.slice(0, 5)}...${address.slice(-4)}` : "..."}
            </p>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-2 w-full md-w-[400px] mx-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="collection">NFT Collection</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg-grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-sm">
                    <Trophy className="w-5 h-5 text-gold" />
                    <span>Player Stats</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Spins:</span>
                    <span className="font-medium">{playerStats.totalSpins}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Premium Spins:</span>
                    <span className="font-medium">{playerStats.premiumSpins}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Winnings:</span>
                    <span className="font-medium text-gold">{playerStats.totalWinnings}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-sm">
                    <Share2 className="w-5 h-5 text-primary" />
                    <span>Referral Link</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-muted-foreground">Your code:</span>
                    <code className="bg-muted px-2 py-1 rounded font-mono">{playerStats.referralCode}</code>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={copyReferralCode}>
                        <Copy className="w-3 h-3" />
                        <span className="sr-only">Copy</span>
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share2 className="w-3 h-3" />
                        <span className="sr-only">Share</span>
                      </Button>
                    </div>
                    {isCopied && <span className="text-xs text-success">Copied!</span>}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Referrals:</span>
                    <span className="font-medium">{playerStats.referrals}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Earnings:</span>
                    <span className="font-medium text-gold">{playerStats.referralEarnings}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="collection" className="mt-6">
            <div className="text-center py-16 text-muted-foreground">
              <h3 className="text-2xl font-bold">Coming Soon!</h3>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;