
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import SproutHubLogo from "./SproutHubLogo";
import UserAvatar from "@/components/ui/user-avatar";

const Navigation = () => {
  const { user, profileData, isLoadingProfile, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
      });
      navigate("/");
    } catch (error) {
      console.error("Sign out error:", error);
      toast({
        title: "Sign out failed",
        description: "There was an error signing you out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const navLinks = [
    { to: "/", label: "Home", showWhenSignedIn: false },
    { to: "/plant-catalog", label: "Plant Catalog", showWhenSignedIn: true },
    { to: "/my-plants", label: "My Plants", showWhenSignedIn: true },
  ];

  const filteredNavLinks = navLinks.filter((link) => {
    if (user) {
      return link.showWhenSignedIn;
    }
    return !link.showWhenSignedIn;
  });

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-plant-secondary/20 fixed w-full top-0 z-[100] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <SproutHubLogo className="w-8 h-8" />
            <span className="text-xl font-bold text-plant-text font-poppins">
              SproutHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {filteredNavLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-plant-text hover:text-plant-primary transition-colors font-medium ${
                  location.pathname === link.to
                    ? "text-plant-primary border-b-2 border-plant-primary pb-1"
                    : ""
                }`}
              >
                {link.label}
              </Link>
            ))}

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full p-0"
                  >
                    <UserAvatar
                      firstName={profileData.first_name}
                      lastName={profileData.last_name}
                      avatarUrl={profileData.avatar_url}
                      isLoading={isLoadingProfile}
                      size="md"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white border border-gray-200 shadow-lg z-[200]" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      {profileData.first_name || profileData.last_name ? (
                        <p className="font-medium">
                          {profileData.first_name} {profileData.last_name}
                        </p>
                      ) : (
                        <p className="font-medium">Plant Parent</p>
                      )}
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={handleSignOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/auth">
                  <Button
                    variant="outline"
                    className="border-plant-primary text-plant-primary hover:bg-plant-primary hover:text-white"
                  >
                    Sign In
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-plant-text hover:text-plant-primary p-2"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-plant-secondary/20 bg-white/95 backdrop-blur-sm">
            <div className="flex flex-col space-y-4">
              {filteredNavLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-plant-text hover:text-plant-primary transition-colors font-medium px-2 py-1 ${
                    location.pathname === link.to ? "text-plant-primary" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {user ? (
                <div className="pt-4 border-t border-plant-secondary/20">
                  <div className="flex items-center space-x-3 px-2 pb-3">
                    <UserAvatar
                      firstName={profileData.first_name}
                      lastName={profileData.last_name}
                      avatarUrl={profileData.avatar_url}
                      isLoading={isLoadingProfile}
                      size="md"
                    />
                    <div>
                      {profileData.first_name || profileData.last_name ? (
                        <p className="font-medium">
                          {profileData.first_name} {profileData.last_name}
                        </p>
                      ) : (
                        <p className="font-medium">Plant Parent</p>
                      )}
                      <p className="text-sm text-plant-text/60">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 text-plant-text hover:text-plant-primary transition-colors px-2 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Settings className="w-4 h-4" />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 text-plant-text hover:text-plant-primary transition-colors px-2 py-2 w-full text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-plant-secondary/20">
                  <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full border-plant-primary text-plant-primary hover:bg-plant-primary hover:text-white"
                    >
                      Sign In
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
