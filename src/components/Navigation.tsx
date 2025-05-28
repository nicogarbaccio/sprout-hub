import { Search, Droplets, Home, BookOpen, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import SproutHubLogo from "@/components/SproutHubLogo";

const Navigation = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-sm border-b border-plant-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/">
            <SproutHubLogo size="sm" />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/plant-catalog">
              <Button
                variant="ghost"
                className="text-plant-text hover:text-plant-primary flex items-center space-x-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Plant Catalog</span>
              </Button>
            </Link>
            {user && (
              <Link to="/my-plants">
                <Button
                  variant="ghost"
                  className="text-plant-text hover:text-plant-primary flex items-center space-x-2"
                >
                  <Droplets className="w-4 h-4" />
                  <span>My Plants</span>
                </Button>
              </Link>
            )}

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-plant-text hover:text-plant-primary"
                  >
                    <User className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={() => navigate("/auth")}
                className="bg-plant-primary hover:bg-plant-primary/90"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
