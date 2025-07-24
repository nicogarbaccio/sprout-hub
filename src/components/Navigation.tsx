import {
  Search,
  Droplets,
  Home,
  BookOpen,
  User,
  LogOut,
  Menu,
  X,
  Flower2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useProfileData } from "@/contexts/ProfileDataContext";
import { useNavigate, Link } from "react-router-dom";
import * as React from "react";
import { ThemeToggle, SimpleThemeToggle } from "@/components/ui/theme-toggle";
import { toast } from "@/hooks/use-toast";
import { ThemeAwareLogo } from "@/components/ui/theme-aware-logo";

const Navigation = () => {
  const { user, signOut } = useAuth();
  const { profileData } = useProfileData();
  const navigate = useNavigate();

  const handleSignIn = () => {
    console.log("Navigation: Sign in button clicked, current user:", user);
    console.log("Navigation: Navigating to /auth");
    navigate("/auth");
  };

  const handleSignOut = async (event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    try {
      console.log("Attempting to sign out...");
      await signOut();
      console.log("Sign out successful, navigating to home...");
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
        variant: "default",
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

  // Helper to get initials for fallback
  const getInitials = () => {
    if (profileData.first_name && profileData.last_name) {
      return `${profileData.first_name.charAt(0)}${profileData.last_name.charAt(
        0
      )}`.toUpperCase();
    }
    return `${profileData.email.charAt(0)}${profileData.email.charAt(
      1
    )}`.toUpperCase();
  };

  return (
    <nav className="bg-background dark:bg-sprout-dark shadow-sm border-b border-sprout-cream/30 dark:border-sprout-cream/20 transition-colors backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-3 group">
            <ThemeAwareLogo className="h-8 w-auto" />
            <span className="text-2xl font-bold text-sprout-primary dark:text-sprout-cream transition-colors duration-200">
              sprouthub
            </span>
          </Link>

          {/* Desktop Nav - Grouped with user section */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            {user && (
              <Link to="/">
                <Button
                  variant="ghost"
                  className="text-foreground hover:text-white hover:bg-sprout-medium dark:hover:bg-sprout-medium/20 dark:hover:text-white flex items-center space-x-2 transition-all duration-200 rounded-lg font-medium"
                >
                  <Home className="w-4 h-4" />
                  <span>Dashboard</span>
                </Button>
              </Link>
            )}
            <Link to="/plant-catalog">
              <Button
                variant="ghost"
                className="text-foreground hover:text-white hover:bg-sprout-medium dark:hover:bg-sprout-medium/20 dark:hover:text-white flex items-center space-x-2 transition-all duration-200 rounded-lg font-medium"
                data-testid="nav-plant-catalog-button"
              >
                <BookOpen className="w-4 h-4" />
                <span>Plant Catalog</span>
              </Button>
            </Link>
            {user && (
              <Link to="/my-plants">
                <Button
                  variant="ghost"
                  className="text-foreground hover:text-white hover:bg-sprout-medium dark:hover:bg-sprout-medium/20 dark:hover:text-white flex items-center space-x-2 transition-all duration-200 rounded-lg font-medium"
                >
                  <Flower2 className="w-4 h-4" />
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
                    className="text-neutral-medium hover:text-sprout-primary p-0 !border-none !ring-0 !outline-none !focus:outline-none !focus-visible:outline-none focus:shadow-none focus-visible:shadow-none rounded-full data-[state=open]:outline-none data-[state=open]:ring-0 data-[state=open]:shadow-none group"
                    style={{
                      background: "none",
                      border: "none",
                      outline: "none",
                      boxShadow: "none",
                      boxSizing: "border-box",
                    }}
                  >
                    <Avatar
                      className="w-10 h-10 transition-all duration-200 hover:ring-4 hover:ring-sprout-primary dark:hover:ring-white hover:ring-offset-2 dark:hover:ring-offset-background hover:shadow-lg"
                      style={{
                        border: "none",
                        outline: "none",
                        boxShadow: "none",
                      }}
                    >
                      <AvatarImage
                        src={profileData.avatar_url}
                        alt="User avatar"
                      />
                      <AvatarFallback className="text-xs font-medium bg-sprout-pale dark:bg-sprout-medium/30 text-sprout-primary dark:text-white transition-all duration-200 group-hover:bg-sprout-primary group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-sprout-primary">
                        {getInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => navigate("/profile")}
                    className="cursor-pointer"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={(event) => handleSignOut(event)}
                    className="text-sprout-warning dark:text-sprout-warning cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={handleSignIn}
                className="bg-sprout-dark hover:bg-sprout-primary dark:hover:bg-sprout-medium/20 text-sprout-white font-medium shadow-sm"
                data-testid="nav-sign-in-button"
              >
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Nav */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-80 bg-background dark:bg-sprout-dark p-0"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between p-4 border-b">
                    <span className="text-lg font-semibold text-foreground dark:text-sprout-cream">
                      Menu
                    </span>
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon">
                        <X className="h-5 w-5" />
                        <span className="sr-only">Close menu</span>
                      </Button>
                    </SheetClose>
                  </div>
                  <div className="flex flex-col gap-2 px-4 py-4 border-b">
                    {user ? (
                      <>
                        <SheetClose asChild>
                          <Link to="/profile">
                            <Button
                              variant="ghost"
                              className="w-full justify-start text-foreground hover:text-white hover:bg-sprout-medium dark:hover:bg-sprout-medium/20 dark:hover:text-white flex items-center space-x-2 transition-all duration-200 rounded-lg font-medium"
                            >
                              <User className="w-4 h-4 mr-2" />
                              <span>Profile</span>
                            </Button>
                          </Link>
                        </SheetClose>
                        <Button
                          onClick={(event) => handleSignOut(event)}
                          variant="ghost"
                          className="w-full justify-start text-sprout-warning dark:text-sprout-warning hover:text-white hover:bg-sprout-medium dark:hover:bg-sprout-medium/20 dark:hover:text-white flex items-center space-x-2 transition-all duration-200 rounded-lg font-medium"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          <span>Sign Out</span>
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={handleSignIn}
                        className="w-full bg-sprout-dark hover:bg-sprout-primary dark:hover:bg-sprout-medium/20 text-sprout-white font-medium"
                        data-testid="mobile-nav-sign-in-button"
                      >
                        Sign In
                      </Button>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 px-4 py-6">
                    {user && (
                      <SheetClose asChild>
                        <Link to="/">
                          <Button
                            variant="ghost"
                            className="w-full justify-start text-foreground hover:text-white hover:bg-sprout-medium dark:hover:bg-sprout-medium/20 dark:hover:text-white flex items-center space-x-2 transition-all duration-200 rounded-lg font-medium"
                          >
                            <Home className="w-4 h-4 mr-2" />
                            <span>Dashboard</span>
                          </Button>
                        </Link>
                      </SheetClose>
                    )}
                    <SheetClose asChild>
                      <Link to="/plant-catalog">
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-foreground hover:text-white hover:bg-sprout-medium dark:hover:bg-sprout-medium/20 dark:hover:text-white flex items-center space-x-2 transition-all duration-200 rounded-lg font-medium"
                          data-testid="mobile-nav-plant-catalog-button"
                        >
                          <BookOpen className="w-4 h-4 mr-2" />
                          <span>Plant Catalog</span>
                        </Button>
                      </Link>
                    </SheetClose>
                    {user && (
                      <SheetClose asChild>
                        <Link to="/my-plants">
                          <Button
                            variant="ghost"
                            className="w-full justify-start text-foreground hover:text-white hover:bg-sprout-medium dark:hover:bg-sprout-medium/20 dark:hover:text-white flex items-center space-x-2 transition-all duration-200 rounded-lg font-medium"
                          >
                            <Flower2 className="w-4 h-4 mr-2" />
                            <span>My Plants</span>
                          </Button>
                        </Link>
                      </SheetClose>
                    )}
                    <div className="mt-6 pt-4 border-t">
                      <SimpleThemeToggle />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
