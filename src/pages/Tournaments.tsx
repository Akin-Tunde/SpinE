import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Trophy, Users, Clock, Coins } from "lucide-react";
import Footer from "@/components/Footer";
import { useState } from "react"; // <-- Import useState

// --- MODIFICATION: Added more mock data to demonstrate "Show More" ---
const tournaments = {
  live: [
    { id: 1, name: "Weekend Warriors Tournament", prizePool: "250,000 SPIN", entry: "100 SPIN", participants: { current: 124, max: 250 }, endTime: "2d 14h 30m", status: "live" },
    { id: 2, name: "High Rollers Championship", prizePool: "500,000 SPIN", entry: "500 SPIN", participants: { current: 45, max: 100 }, endTime: "1d 8h 45m", status: "live" },
    { id: 6, name: "Daily Dash", prizePool: "50,000 SPIN", entry: "20 SPIN", participants: { current: 300, max: 500 }, endTime: "12h 5m", status: "live" }
  ],
  upcoming: [
    { id: 3, name: "NFT Holders Only", prizePool: "50,000 SPIN + NFTs", entry: "Rare NFT", participants: { current: 12, max: 100 }, startTime: "4d 8h 30m", status: "upcoming" },
    { id: 4, name: "Newbie Tournament", prizePool: "10,000 SPIN", entry: "10 SPIN", participants: { current: 0, max: 500 }, startTime: "6d 12h", status: "upcoming" }
  ],
  completed: [
    { id: 5, name: "Monday Madness", prizePool: "100,000 SPIN", entry: "50 SPIN", participants: { current: 200, max: 200 }, winner: "0xABC...123", status: "completed" },
    { id: 7, name: "Last Week's Legends", prizePool: "150,000 SPIN", entry: "75 SPIN", participants: { current: 150, max: 150 }, winner: "0xDEF...456", status: "completed" },
    { id: 8, name: "Starter Sprint", prizePool: "20,000 SPIN", entry: "25 SPIN", participants: { current: 100, max: 100 }, winner: "0xGHI...789", status: "completed" }
  ]
};

const TournamentCard = ({ tournament }: { tournament: any }) => {
  const renderActionButton = () => {
    switch (tournament.status) {
      case 'live':
        return (
          <Button className="bg-gradient-to-r from-primary to-secondary w-full sm:w-auto">
            JOIN NOW
          </Button>
        );
      case 'upcoming':
        return (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                VIEW DETAILS
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>{tournament.name}</DialogTitle>
                <DialogDescription>
                  This tournament is starting soon. Get ready to compete!
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Starts in:</span>
                  <span className="font-medium">{tournament.startTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Prize Pool:</span>
                  <span className="font-medium text-gold">{tournament.prizePool}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Entry Fee:</span>
                  <span className="font-medium">{tournament.entry}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Participants:</span>
                  <span className="font-medium">{tournament.participants.current} / {tournament.participants.max}</span>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        );
      case 'completed':
        return (
          <Button variant="ghost" disabled className="w-full sm:w-auto">
            COMPLETED
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full transition-shadow hover:shadow-lg">
      <CardHeader>
        <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-lg sm:text-xl font-bold">{tournament.name}</CardTitle>
          <Badge 
            variant={tournament.status === 'live' ? 'default' : tournament.status === 'upcoming' ? 'secondary' : 'outline'}
            className={`${tournament.status === 'live' ? 'animate-glow' : ''} flex-shrink-0`}
          >
            {tournament.status.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
          <div className="flex items-center space-x-2">
            <Trophy className="w-4 h-4 text-gold flex-shrink-0" />
            <span className="text-sm">Prize Pool: <span className="font-medium text-gold">{tournament.prizePool}</span></span>
          </div>
          <div className="flex items-center space-x-2">
            <Coins className="w-4 h-4 text-primary flex-shrink-0" />
            <span className="text-sm">Entry: <span className="font-medium">{tournament.entry}</span></span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <span className="text-sm">Participants: <span className="font-medium">{tournament.participants.current} / {tournament.participants.max}</span></span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <span className="text-sm truncate">
              {tournament.status === 'live' ? `Ends in: ${tournament.endTime}` : 
               tournament.status === 'upcoming' ? `Starts in: ${tournament.startTime}` :
               `Winner: ${tournament.winner}`}
            </span>
          </div>
        </div>
        
        <div className="flex justify-end pt-2">
          {renderActionButton()}
        </div>
      </CardContent>
    </Card>
  );
};

const Tournaments = () => {
  // --- MODIFICATION: State to manage how many items are visible in each tab ---
  const [visibleCounts, setVisibleCounts] = useState({
    live: 2,
    upcoming: 2,
    completed: 2,
  });

  const handleShowMore = (category: keyof typeof visibleCounts) => {
    setVisibleCounts(prev => ({
      ...prev,
      [category]: prev[category] + 2, // Show 2 more items
    }));
  };
  
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Navigation />
      
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Tournaments</h1>
          <p className="text-sm text-muted-foreground">Compete against other players for massive prizes.</p>
        </div>

        <Tabs defaultValue="live" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="live">LIVE</TabsTrigger>
            <TabsTrigger value="upcoming">UPCOMING</TabsTrigger>
            <TabsTrigger value="completed">COMPLETED</TabsTrigger>
          </TabsList>
          
          {/* --- MODIFICATION: Live Tournaments Tab --- */}
          <TabsContent value="live" className="space-y-6 mt-6 md:mt-8">
            {tournaments.live.slice(0, visibleCounts.live).map((tournament) => (
              <TournamentCard key={tournament.id} tournament={tournament} />
            ))}
            {visibleCounts.live < tournaments.live.length && (
              <div className="text-center pt-2">
                <Button variant="outline" onClick={() => handleShowMore('live')} className="w-full sm:w-auto">
                  Show More
                </Button>
              </div>
            )}
          </TabsContent>
          
          {/* --- MODIFICATION: Upcoming Tournaments Tab --- */}
          <TabsContent value="upcoming" className="space-y-6 mt-6 md:mt-8">
            {tournaments.upcoming.slice(0, visibleCounts.upcoming).map((tournament) => (
              <TournamentCard key={tournament.id} tournament={tournament} />
            ))}
            {visibleCounts.upcoming < tournaments.upcoming.length && (
              <div className="text-center pt-2">
                <Button variant="outline" onClick={() => handleShowMore('upcoming')} className="w-full sm:w-auto">
                  Show More
                </Button>
              </div>
            )}
          </TabsContent>
          
          {/* --- MODIFICATION: Completed Tournaments Tab --- */}
          <TabsContent value="completed" className="space-y-6 mt-6 md:mt-8">
            {tournaments.completed.slice(0, visibleCounts.completed).map((tournament) => (
              <TournamentCard key={tournament.id} tournament={tournament} />
            ))}
             {visibleCounts.completed < tournaments.completed.length && (
              <div className="text-center pt-2">
                <Button variant="outline" onClick={() => handleShowMore('completed')} className="w-full sm:w-auto">
                  Show More
                </Button>
              </div>
            )}
            {tournaments.completed.length === 0 && (
                 <div className="text-center py-12 text-muted-foreground">
                    <p>No completed tournaments yet.</p>
                </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
       <Footer />
    </div>
  );
};

export default Tournaments;

