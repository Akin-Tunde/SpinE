import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, ShoppingCart, ArrowUpDown, Image } from "lucide-react";
import { useState } from "react";
import Footer from "@/components/Footer";

const marketplaceNFTs = [
  { id: 1, name: "SpinGame NFT #123", rarity: "Rare", price: "500 SPIN", owner: "0x34...fG", image: "/placeholder.svg", forSale: true },
  { id: 2, name: "SpinGame NFT #456", rarity: "Legendary", price: "10,000 SPIN", owner: "0x45...eF", image: "/placeholder.svg", forSale: true },
  { id: 3, name: "SpinGame NFT #789", rarity: "Rare", price: "525 SPIN", owner: "0x56...aB", image: "/placeholder.svg", forSale: true },
  { id: 4, name: "SpinGame NFT #234", rarity: "Epic", price: "2,500 SPIN", owner: "0x67...cD", image: "/placeholder.svg", forSale: true },
  { id: 5, name: "SpinGame NFT #567", rarity: "Common", price: "100 SPIN", owner: "0x78...eF", image: "/placeholder.svg", forSale: true },
  { id: 6, name: "SpinGame NFT #890", rarity: "Mythic", price: "25,000 SPIN", owner: "0x89...gH", image: "/placeholder.svg", forSale: true },
  { id: 7, name: "SpinGame NFT #345", rarity: "Rare", price: "750 SPIN", owner: "0x9A...iJ", image: "/placeholder.svg", forSale: true },
  { id: 8, name: "SpinGame NFT #678", rarity: "Epic", price: "3,200 SPIN", owner: "0xAB...kL", image: "/placeholder.svg", forSale: true },
];

const getRarityColor = (rarity: string) => {
  switch (rarity.toLowerCase()) {
    case 'common': return 'bg-gray-500';
    case 'rare': return 'bg-blue-500';
    case 'epic': return 'bg-purple-500';
    case 'legendary': return 'bg-orange-500';
    case 'mythic': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("price-low");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [selectedRarities, setSelectedRarities] = useState<string[]>([]);
  
  const sortOptions = [
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "recently-listed", label: "Recently Listed" },
    { value: "oldest", label: "Oldest" }
  ];

  const filteredMarketplaceNFTs = marketplaceNFTs.filter(nft => {
    // Search filter
    if (searchQuery && !nft.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Rarity filter
    if (selectedRarities.length > 0 && !selectedRarities.includes(nft.rarity)) {
      return false;
    }
    
    // Price range filter
    const priceValue = parseInt(nft.price.replace(/[^\d]/g, ''));
    if (priceRange.min && priceValue < parseInt(priceRange.min)) {
      return false;
    }
    if (priceRange.max && priceValue > parseInt(priceRange.max)) {
      return false;
    }
    
    return true;
  }).sort((a, b) => {
    const priceA = parseInt(a.price.replace(/[^\d]/g, ''));
    const priceB = parseInt(b.price.replace(/[^\d]/g, ''));
    
    switch (sortBy) {
      case "price-low":
        return priceA - priceB;
      case "price-high":
        return priceB - priceA;
      case "recently-listed":
        return b.id - a.id;
      case "oldest":
        return a.id - b.id;
      default:
        return 0;
    }
  });

  const toggleRarityFilter = (rarity: string) => {
    setSelectedRarities(prev => 
      prev.includes(rarity) 
        ? prev.filter(r => r !== rarity)
        : [...prev, rarity]
    );
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">NFT Marketplace</h1>
          <p className="text-muted-foreground">Discover, buy, and sell unique SpinGame NFTs</p>
        </div>

        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div className="w-80 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* For Sale Filter */}
                <div>
                  <h4 className="font-medium text-sm mb-2">Status</h4>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm">For Sale</span>
                  </label>
                </div>

                {/* Rarity Filter */}
                <div>
                  <h4 className="font-medium text-sm mb-3">Rarity</h4>
                  <div className="space-y-2">
                    {["Common", "Rare", "Epic", "Legendary", "Mythic"].map((rarity) => (
                      <label key={rarity} className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          className="rounded"
                          checked={selectedRarities.includes(rarity)}
                          onChange={() => toggleRarityFilter(rarity)}
                        />
                        <span className="text-sm">{rarity}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div>
                  <h4 className="font-medium text-sm mb-3">Price Range (SPIN)</h4>
                  <div className="space-y-2">
                    <input 
                      type="number" 
                      placeholder="Min price"
                      className="w-full px-3 py-2 border rounded-md text-sm"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({...prev, min: e.target.value}))}
                    />
                    <input 
                      type="number" 
                      placeholder="Max price"
                      className="w-full px-3 py-2 border rounded-md text-sm"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({...prev, max: e.target.value}))}
                    />
                    <Button 
                      size="sm" 
                      className="w-full"
                      onClick={() => {/* Apply filters */}}
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Marketplace Content */}
          <div className="flex-1">
            {/* Search and Sort Bar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex-1 max-w-md relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by NFT ID..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
                <select 
                  className="px-3 py-2 border rounded-lg text-sm"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* NFT Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredMarketplaceNFTs.map((nft) => (
                <Card key={nft.id} className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group">
                  <div className="aspect-square bg-muted flex items-center justify-center relative">
                    <Image className="w-16 h-16 text-muted-foreground" />
                    <Badge 
                      className={`absolute top-2 right-2 text-xs ${getRarityColor(nft.rarity)} text-white`}
                    >
                      {nft.rarity}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-medium text-sm truncate mb-1">{nft.name}</h4>
                    <p className="text-xs text-muted-foreground mb-2">Owner: {nft.owner}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-primary">{nft.price}</span>
                      <Button 
                        size="sm" 
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ShoppingCart className="w-3 h-3 mr-1" />
                        Buy
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredMarketplaceNFTs.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No NFTs found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters or search criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
       <Footer />
    </div>
  );
};

export default Marketplace;