import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, ShoppingCart, ArrowUpDown, Image, Filter } from "lucide-react";
import { useState } from "react";
import Footer from "@/components/Footer";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

// Data remains the same...
const marketplaceNFTs = [
  { id: 1, name: "SpinGame NFT #123", rarity: "Rare", price: "500 SPIN", owner: "0x34...fG", image: "/placeholder.svg", forSale: true },
  { id: 2, name: "SpinGame NFT #456", rarity: "Legendary", price: "10,000 SPIN", owner: "0x45...eF", image: "/placeholder.svg", forSale: true },
  { id: 3, name: "SpinGame NFT #789", rarity: "Rare", price: "525 SPIN", owner: "0x56...aB", image: "/placeholder.svg", forSale: true },
  { id: 4, name: "SpinGame NFT #234", rarity: "Epic", price: "2,500 SPIN", owner: "0x67...cD", image: "/placeholder.svg", forSale: true },
  { id: 5, name: "SpinGame NFT #567", rarity: "Common", price: "100 SPIN", owner: "0x78...eF", image: "/placeholder.svg", forSale: true },
  { id: 6, name: "SpinGame NFT #890", rarity: "Mythic", price: "25,000 SPIN", owner: "0x89...gH", image: "/placeholder.svg", forSale: true },
  { id: 7, name: "SpinGame NFT #345", rarity: "Rare", price: "750 SPIN", owner: "0x9A...iJ", image: "/placeholder.svg", forSale: true },
  { id: 8, name: "SpinGame NFT #678", rarity: "Epic", price: "3,200 SPIN", owner: "0xAB...kL", image: "/placeholder.svg", forSale: true },
  { id: 9, name: "SpinGame NFT #111", rarity: "Common", price: "120 SPIN", owner: "0xBC...mN", image: "/placeholder.svg", forSale: true },
  { id: 10, name: "SpinGame NFT #222", rarity: "Rare", price: "600 SPIN", owner: "0xCD...oP", image: "/placeholder.svg", forSale: true },
  { id: 11, name: "SpinGame NFT #333", rarity: "Epic", price: "2800 SPIN", owner: "0xDE...qR", image: "/placeholder.svg", forSale: true },
  { id: 12, name: "SpinGame NFT #444", rarity: "Legendary", price: "12000 SPIN", owner: "0xEF...sT", image: "/placeholder.svg", forSale: true },
  // ... more data
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

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("price-low");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [selectedRarities, setSelectedRarities] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(10);
  
  const sortOptions = [
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "recently-listed", label: "Recently Listed" },
    { value: "oldest", label: "Oldest" }
  ];

  const filteredMarketplaceNFTs = marketplaceNFTs.filter(nft => {
    // ... filtering logic remains the same
    if (searchQuery && !nft.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (selectedRarities.length > 0 && !selectedRarities.includes(nft.rarity)) return false;
    const priceValue = parseInt(nft.price.replace(/[^\d]/g, ''));
    if (priceRange.min && priceValue < parseInt(priceRange.min)) return false;
    if (priceRange.max && priceValue > parseInt(priceRange.max)) return false;
    return true;
  }).sort((a, b) => {
    // ... sorting logic remains the same
    const priceA = parseInt(a.price.replace(/[^\d]/g, ''));
    const priceB = parseInt(b.price.replace(/[^\d]/g, ''));
    switch (sortBy) {
      case "price-low": return priceA - priceB;
      case "price-high": return priceB - priceA;
      case "recently-listed": return b.id - a.id;
      case "oldest": return a.id - b.id;
      default: return 0;
    }
  });

  const toggleRarityFilter = (rarity: string) => {
    setSelectedRarities(prev => 
      prev.includes(rarity) 
        ? prev.filter(r => r !== rarity)
        : [...prev, rarity]
    );
  };

  const handleShowMore = () => {
    setVisibleCount(prevCount => prevCount + 10);
  };

  const Filters = () => (
    <Card className="border-0 shadow-none">
      <CardHeader>
        <CardTitle className="text-lg">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="font-medium text-sm mb-2">Status</h4>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded text-primary focus:ring-primary" />
            <span className="text-sm">For Sale</span>
          </label>
        </div>
        <div>
          <h4 className="font-medium text-sm mb-3">Rarity</h4>
          <div className="space-y-2">
            {["Common", "Rare", "Epic", "Legendary", "Mythic"].map((rarity) => (
              <label key={rarity} className="flex items-center space-x-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="rounded text-primary focus:ring-primary"
                  checked={selectedRarities.includes(rarity)}
                  onChange={() => toggleRarityFilter(rarity)}
                />
                <span className="text-sm">{rarity}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-medium text-sm mb-3">Price Range (SPIN)</h4>
          <div className="flex items-center gap-2">
            <input 
              type="number" placeholder="Min"
              className="w-full px-3 py-2 border rounded-md text-sm bg-background focus:ring-primary focus:border-primary"
              value={priceRange.min}
              onChange={(e) => setPriceRange(prev => ({...prev, min: e.target.value}))}
            />
             <span className="text-muted-foreground">-</span>
            <input 
              type="number" placeholder="Max"
              className="w-full px-3 py-2 border rounded-md text-sm bg-background focus:ring-primary focus:border-primary"
              value={priceRange.max}
              onChange={(e) => setPriceRange(prev => ({...prev, max: e.target.value}))}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    // Added responsive bottom padding
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Navigation />
      
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">NFT Marketplace</h1>
          <p className="text-muted-foreground">Discover, buy, and sell unique SpinGame NFTs</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="hidden md:block w-full md:w-72 flex-shrink-0">
            <Filters />
          </div>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
              <div className="w-full sm:flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by NFT name or ID..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg bg-background"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between w-full sm:w-auto gap-2">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="md:hidden flex items-center gap-2 w-full">
                      <Filter className="w-4 h-4" />
                      <span>Filters</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="w-[300px] sm:w-[350px] overflow-y-auto p-0">
                    <SheetHeader className="p-6 pb-0">
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <Filters />
                  </SheetContent>
                </Sheet>

                <select 
                  className="px-3 py-2 border rounded-lg text-sm bg-background h-10 w-full"
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

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
              {filteredMarketplaceNFTs.slice(0, visibleCount).map((nft) => (
                <Card key={nft.id} className="overflow-hidden group">
                  <div className="aspect-square bg-muted flex items-center justify-center relative">
                    <Image className="w-16 h-16 text-muted-foreground transition-transform group-hover:scale-105" />
                    <Badge 
                      className={`absolute top-1.5 right-1.5 text-xs ${getRarityColor(nft.rarity)} text-white border-transparent`}
                    >
                      {nft.rarity}
                    </Badge>
                  </div>
                  <CardContent className="p-2 sm:p-3">
                    <h4 className="font-semibold text-xs sm:text-sm truncate mb-1">{nft.name}</h4>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-bold text-primary truncate">{nft.price}</span>
                      <Button 
                        size="sm" 
                        // **KEY CHANGE**: Button is now visible by default, hover effect only on desktop
                        className="text-xs h-7 px-2 flex-shrink-0 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                      >
                        <ShoppingCart className="w-3 h-3 mr-1" />
                        Buy
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {visibleCount < filteredMarketplaceNFTs.length && (
              <div className="mt-8 text-center">
                <Button onClick={handleShowMore} variant="outline" className="w-full sm:w-auto">
                  Show More
                </Button>
              </div>
            )}

            {filteredMarketplaceNFTs.length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No NFTs Found</h3>
                <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                  Try adjusting your filters or search criteria.
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