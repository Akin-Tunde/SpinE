import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Copy, Share2, Trophy, Image, Filter, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { useAccount } from "wagmi";
import { ConnectButton } from "@/components/ConnectButton";
import Footer from "@/components/Footer";

// NOTE: This data remains static for now.
const playerStats = {
  totalSpins: 452,
  premiumSpins: 89,
  totalWinnings: "10,240 SPIN",
  referralCode: "ALEX123",
  referrals: 5,
  referralEarnings: "500 SPIN"
};

const nftCollection = [
  { id: 1, name: "Epic Dragon #1234", rarity: "Epic", image: "/placeholder.svg" },
  { id: 2, name: "Rare Sword #567", rarity: "Rare", image: "/placeholder.svg" },
  { id: 3, name: "Legendary Shield #89", rarity: "Legendary", image: "/placeholder.svg" },
  { id: 4, name: "Common Potion #9999", rarity: "Common", image: "/placeholder.svg" },
  { id: 5, name: "Mythic Crown #1", rarity: "Mythic", image: "/placeholder.svg" },
  { id: 6, name: "Rare Bow #345", rarity: "Rare", image: "/placeholder.svg" },
];

const getRarityColor = (rarity: string) => {
  switch (rarity.toLowerCase()) {
    case 'common': return 'bg-gray-500 hover:bg-gray-600';
    case 'rare': return 'bg-blue-500 hover:bg-blue-600';
    case 'epic': return 'bg-purple-500 hover:bg-purple-600';
    case 'legendary': return 'bg-orange-500 hover:bg-orange-600';
    case 'mythic': return 'bg-red-500 hover:bg-red-600';
    default: return 'bg-gray-500';
  }
};

const Profile = () => {
  const { address, isConnected } = useAccount();
  const [selectedFilter, setSelectedFilter] = useState("All");
  const filters = ["All", "Common", "Rare", "Epic", "Legendary", "Mythic"];

  const filteredNFTs = selectedFilter === "All" 
    ? nftCollection 
    : nftCollection.filter(nft => nft.rarity === selectedFilter);

  const copyReferralCode = () => {
    navigator.clipboard.writeText(playerStats.referralCode);
  };

  // Render a prompt to connect if the wallet is not connected
  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background flex flex-col pb-20 md:pb-0">
        <Navigation />
        <div className="flex-grow container mx-auto px-4 md:px-6 py-8 flex items-center justify-center">
            <Card className="max-w-md w-full mx-auto p-6 md:p-8 text-center">
                <CardHeader>
                    <AlertTriangle className="w-12 h-12 text-warning mx-auto" />
                    <CardTitle className="mt-4 text-xl md:text-2xl">Please Connect Your Wallet</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-6">
                        You need to connect your wallet to view your profile, stats, and NFT collection.
                    </p>
                    <ConnectButton />
                </CardContent>
            </Card>
        </div>
        <Footer />
      </div>
    );
  }

  // Render the full profile if connected
  return (
    // Added bottom padding for mobile footer
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Navigation />
      
      <div className="container mx-auto px-4 md:px-6 py-8">
        {/* Responsive Header: Stacks on mobile */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-8 h-8 text-white" />
          </div>
          <div className="min-w-0">
            <h1 className="text-2xl md:text-3xl font-bold">My Profile</h1>
            {/* Break-all ensures long address doesn't overflow */}
            <p className="text-muted-foreground font-mono text-sm break-all">{address}</p>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          {/* Responsive Tabs: Full-width on mobile */}
          <TabsList className="grid grid-cols-2 w-full md:w-[400px] mx-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="collection">NFT Collection</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            {/* This grid is already responsive, stacking to 1 column by default */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Player Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5 text-gold" />
                    <span>Player Stats</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
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

              {/* Referral */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Share2 className="w-5 h-5 text-primary" />
                    <span>Referral Link</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm text-muted-foreground">Your code:</span>
                    <code className="bg-muted px-2 py-1 rounded text-sm font-mono">{playerStats.referralCode}</code>
                    <div className="flex gap-2">
                        <Button size="icon-sm" variant="outline" onClick={copyReferralCode}>
                            <Copy className="w-3 h-3" />
                        </Button>
                        <Button size="icon-sm" variant="outline">
                            <Share2 className="w-3 h-3" />
                        </Button>
                    </div>
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
            <Card>
              <CardHeader>
                {/* Responsive Filter Section: Stacks on mobile */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <CardTitle className="flex items-center space-x-2">
                    <Image className="w-5 h-5 text-secondary" />
                    <span>MY NFT COLLECTION</span>
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    {/* flex-wrap allows filters to wrap to the next line */}
                    <div className="flex flex-wrap gap-2">
                      {filters.map((filter) => (
                        <Button
                          key={filter}
                          size="sm"
                          variant={selectedFilter === filter ? "default" : "outline"}
                          onClick={() => setSelectedFilter(filter)}
                          className="text-xs h-8"
                        >
                          {filter}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* This NFT grid is already perfectly responsive */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredNFTs.map((nft) => (
                    <Card key={nft.id} className="overflow-hidden group hover:shadow-lg transition-shadow cursor-pointer">
                      <div className="aspect-square bg-muted flex items-center justify-center relative">
                        <Image className="w-16 h-16 text-muted-foreground transition-transform group-hover:scale-110" />
                        <Badge 
                          className={`absolute top-2 right-2 text-xs border-transparent ${getRarityColor(nft.rarity)} text-white`}
                        >
                          {nft.rarity}
                        </Badge>
                      </div>
                      <div className="p-3">
                        <h4 className="font-medium text-sm truncate">{nft.name}</h4>
                      </div>
                    </Card>
                  ))}
                </div>
                {filteredNFTs.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <p>No NFTs found for this filter.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;