import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Users, Clock, Coins } from "lucide-react";
import Footer from "@/components/Footer";

const tournaments = {
  live: [
    {
      id: 1,
      name: "Weekend Warriors Tournament",
      prizePool: "250,000 SPIN",
      entry: "100 SPIN",
      participants: { current: 124, max: 250 },
      endTime: "2d 14h 30m 12s",
      status: "live"
    },
    {
      id: 2,
      name: "High Rollers Championship",
      prizePool: "500,000 SPIN",
      entry: "500 SPIN",
      participants: { current: 45, max: 100 },
      endTime: "1d 8h 45m 20s",
      status: "live"
    }
  ],
  upcoming: [
    {
      id: 3,
      name: "NFT Holders Only",
      prizePool: "50,000 SPIN + NFTs",
      entry: "Rare NFT",
      participants: { current: 12, max: 100 },
      startTime: "4d 8h 30m",
      status: "upcoming"
    },
    {
      id: 4,
      name: "Newbie Tournament",
      prizePool: "10,000 SPIN",
      entry: "10 SPIN",
      participants: { current: 0, max: 500 },
      startTime: "6d 12h",
      status: "upcoming"
    }
  ],
  completed: [
    {
      id: 5,
      name: "Monday Madness",
      prizePool: "100,000 SPIN",
      entry: "50 SPIN",
      participants: { current: 200, max: 200 },
      winner: "0xABC...123",
      status: "completed"
    }
  ]
};

const TournamentCard = ({ tournament }: { tournament: any }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">{tournament.name}</CardTitle>
          <Badge 
            variant={tournament.status === 'live' ? 'default' : tournament.status === 'upcoming' ? 'secondary' : 'outline'}
            className={tournament.status === 'live' ? 'animate-glow' : ''}
          >
            {tournament.status.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Trophy className="w-4 h-4 text-gold" />
            <span className="text-sm">Prize Pool: <span className="font-medium text-gold">{tournament.prizePool}</span></span>
          </div>
          <div className="flex items-center space-x-2">
            <Coins className="w-4 h-4 text-primary" />
            <span className="text-sm">Entry: <span className="font-medium">{tournament.entry}</span></span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">Participants: <span className="font-medium">{tournament.participants.current} / {tournament.participants.max}</span></span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">
              {tournament.status === 'live' ? `Ends in: ${tournament.endTime}` : 
               tournament.status === 'upcoming' ? `Starts in: ${tournament.startTime}` :
               `Winner: ${tournament.winner}`}
            </span>
          </div>
        </div>
        
        <div className="flex justify-end">
          {tournament.status === 'live' && (
            <Button className="bg-gradient-to-r from-primary to-secondary">
              JOIN NOW
            </Button>
          )}
          {tournament.status === 'upcoming' && (
            <Button variant="outline">
              VIEW DETAILS
            </Button>
          )}
          {tournament.status === 'completed' && (
            <Button variant="ghost" disabled>
              COMPLETED
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const Tournaments = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Tournaments</h1>
          <p className="text-muted-foreground">Compete against other players for massive prizes</p>
        </div>

        <Tabs defaultValue="live" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="live">LIVE</TabsTrigger>
            <TabsTrigger value="upcoming">UPCOMING</TabsTrigger>
            <TabsTrigger value="completed">COMPLETED</TabsTrigger>
          </TabsList>
          
          <TabsContent value="live" className="space-y-6 mt-8">
            {tournaments.live.map((tournament) => (
              <TournamentCard key={tournament.id} tournament={tournament} />
            ))}
          </TabsContent>
          
          <TabsContent value="upcoming" className="space-y-6 mt-8">
            {tournaments.upcoming.map((tournament) => (
              <TournamentCard key={tournament.id} tournament={tournament} />
            ))}
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-6 mt-8">
            {tournaments.completed.map((tournament) => (
              <TournamentCard key={tournament.id} tournament={tournament} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
       <Footer />
    </div>
  );
};

export default Tournaments;