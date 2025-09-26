import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AlertTriangle, Home } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const NotFound = () => {
  const location = useLocation();

  // This useEffect hook for logging is a great idea and is kept as is.
  useEffect(() => {
    console.error(`404 Error: User attempted to access non-existent route: ${location.pathname}`);
  }, [location.pathname]);

  return (
    // Use the standard page layout with responsive bottom padding
    <div className="flex flex-col min-h-screen bg-background pb-20 md:pb-0">
      <Navigation />

      {/* Main content area */}
      <main className="flex flex-grow items-center justify-center container mx-auto px-4 py-8">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <AlertTriangle className="mx-auto h-12 w-12 text-warning" />
            <CardTitle className="mt-4 text-3xl md:text-4xl font-bold">
              404 - Page Not Found
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-muted-foreground">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>
            <Button asChild>
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Return to Home
              </Link>
            </Button>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;