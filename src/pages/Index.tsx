import Navigation from "@/components/Navigation";
import SpinWheel from "@/components/SpinWheel";
import RecentWins from "@/components/RecentWins";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Navigation />
      
      <div className="container mx-auto px-6 py-1">
        <div className="space-y-1">
          {/* Main Spin Area */}
          <div>
            <SpinWheel />
          </div>

          {/* Recent Wins Below */}
          <div className="flex justify-center">
            <RecentWins />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;