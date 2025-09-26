import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Trophy, User } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data for the leaderboard
const leaderboardData = [
  { rank: 1, player: "CryptoKing", winnings: "150,250 SPIN", wins: 45 },
  { rank: 2, player: "NFTQueen", winnings: "125,800 SPIN", wins: 38 },
  { rank: 3, player: "0x89...42", winnings: "98,500 SPIN", wins: 52 },
  { rank: 4, player: "Alex", winnings: "75,100 SPIN", wins: 30 },
  { rank: 5, player: "Jane", winnings: "68,400 SPIN", wins: 41 },
  { rank: 6, player: "Mike", winnings: "55,200 SPIN", wins: 25 },
  { rank: 7, player: "HighRoller", winnings: "49,900 SPIN", wins: 19 },
  { rank: 8, player: "SpinMaster", winnings: "45,300 SPIN", wins: 60 },
  { rank: 9, player: "LuckyLuke", winnings: "42,000 SPIN", wins: 22 },
];

// Mock data for the current user
const yourData = { rank: 25, player: "You", winnings: "12,500 SPIN", wins: 15 };

const Leaderboard = () => {
  return (
    <div className="min-h-screen bg-background pb-5 md:pb-0">
      <Navigation />

      <div className="container mx-auto px-4 md:px-6 py-2">
        <div className="text-center mb-8 md:mb-12">
          <BarChart className="w-12 h-12 mx-auto text-primary mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold">Leaderboard</h1>
          <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
            See who is topping the charts and winning the most.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-gold" />
              <span>Top Players</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Rank</TableHead>
                  <TableHead>Player</TableHead>
                  <TableHead className="text-right">Total Winnings</TableHead>
                  <TableHead className="text-right">Total Wins</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboardData.map((player) => (
                  <TableRow key={player.rank}>
                    <TableCell className="font-medium">{player.rank}</TableCell>
                    <TableCell>{player.player}</TableCell>
                    <TableCell className="text-right font-medium text-gold">
                      {player.winnings}
                    </TableCell>
                    <TableCell className="text-right">{player.wins}</TableCell>
                  </TableRow>
                ))}

                {/* --- SEPARATOR ROW --- */}
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="py-2 text-center text-muted-foreground"
                  >
                    ...
                  </TableCell>
                </TableRow>

                {/* --- "YOU" ROW --- */}
                <TableRow className="bg-primary/10 hover:bg-primary/20">
                  <TableCell className="font-medium">{yourData.rank}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span className="font-semibold">{yourData.player}</span>
                  </TableCell>
                  <TableCell className="text-right font-medium text-gold">
                    {yourData.winnings}
                  </TableCell>
                  <TableCell className="text-right">{yourData.wins}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Leaderboard;