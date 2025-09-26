import Navigation from "@/components/Navigation";
import SpinWheel from "@/components/SpinWheel";
import RecentWins from "@/components/RecentWins";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    // This padding for the footer is already perfectly implemented.
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Navigation />
      
      {/* 
        KEY CHANGES:
        - Adjusted horizontal padding (px) to be slightly tighter on mobile.
        - Increased vertical padding (py) for better overall breathing room.
      */}
      <div className="container mx-auto px-4 md:px-6 py-4 md:py-8">
        {/* 
          KEY CHANGE:
          - Increased the vertical spacing between SpinWheel and RecentWins 
            for better visual separation.
        */}
        <div className="space-y-8 md:space-y-12">
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