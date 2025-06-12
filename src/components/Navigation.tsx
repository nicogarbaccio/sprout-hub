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
import { useAuth } from "@/contexts/AuthContext";
import { useProfileData } from "@/contexts/ProfileDataContext";
import { useNavigate, Link } from "react-router-dom";
import SproutHubLogo from "@/components/SproutHubLogo";
import * as React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ui/theme-toggle";

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
    if (!profileData.first_name && !profileData.last_name) return "";
    return `${profileData.first_name?.charAt(0) || ""}${
      profileData.last_name?.charAt(0) || ""
    }`.toUpperCase();
  };

  return (
    <nav className="bg-background dark:bg-background shadow-sm border-b border-plant-secondary/20 dark:border-plant-secondary/30 transition-colors backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="group">
            <SproutHubLogo size="md" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            {user && (
              <Link to="/">
                <Button
                  variant="ghost"
                  className="text-foreground hover:text-white hover:bg-plant-secondary dark:hover:bg-plant-secondary/90 dark:hover:text-white flex items-center space-x-2 transition-all duration-200 rounded-lg font-medium"
                >
                  <Home className="w-4 h-4" />
                  <span>Dashboard</span>
                </Button>
              </Link>
            )}
            <Link to="/plant-catalog">
              <Button
                variant="ghost"
                className="text-foreground hover:text-white hover:bg-plant-secondary dark:hover:bg-plant-secondary/90 dark:hover:text-white flex items-center space-x-2 transition-all duration-200 rounded-lg font-medium"
              >
                <BookOpen className="w-4 h-4" />
                <span>Plant Catalog</span>
              </Button>
            </Link>
            {user && (
              <Link to="/my-plants">
                <Button
                  variant="ghost"
                  className="text-foreground hover:text-white hover:bg-plant-secondary dark:hover:bg-plant-secondary/90 dark:hover:text-white flex items-center space-x-2 transition-all duration-200 rounded-lg font-medium"
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
                    className="text-plant-text hover:text-plant-primary p-0 !border-none !ring-0 !outline-none !focus:outline-none !focus-visible:outline-none focus:shadow-none focus-visible:shadow-none rounded-full data-[state=open]:outline-none data-[state=open]:ring-0 data-[state=open]:shadow-none group"
                    style={{
                      background: "none",
                      border: "none",
                      outline: "none",
                      boxShadow: "none",
                      boxSizing: "border-box",
                    }}
                  >
                    <Avatar
                      className="w-10 h-10 transition-all duration-200 hover:ring-4 hover:ring-plant-secondary dark:hover:ring-white hover:ring-offset-2 dark:hover:ring-offset-background hover:scale-105 hover:shadow-lg"
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
                      <AvatarFallback className="text-xs font-medium bg-plant-secondary/20 dark:bg-plant-secondary/30 text-plant-primary dark:text-white transition-all duration-200 group-hover:bg-plant-secondary group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-plant-primary">
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
                    className="text-red-600 dark:text-red-400 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={handleSignIn}
                className="bg-plant-secondary hover:bg-plant-secondary/90 text-plant-primary dark:text-white font-medium shadow-sm"
              >
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="md:hidden flex items-center space-x-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open menu"
                  className="w-12 h-12 text-foreground hover:bg-plant-secondary/20 dark:hover:bg-plant-secondary/30"
                >
                  <Menu className="w-8 h-8" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="p-0 w-64">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between px-4 py-4 border-b">
                    <Link
                      to="/"
                      onClick={() => document.body.click() /* closes sheet */}
                      className="group"
                    >
                      <SproutHubLogo size="md" />
                    </Link>
                  </div>
                  <div className="flex flex-col gap-2 px-4 py-4 border-b">
                    {user ? (
                      <>
                        <SheetClose asChild>
                          <Button
                            variant="ghost"
                            className="w-full justify-start flex items-center space-x-3 pl-2"
                            onClick={() => navigate("/profile")}
                            style={{
                              paddingTop: 0,
                              paddingBottom: 0,
                              height: "48px",
                            }}
                          >
                            <span className="flex items-center">
                              <Avatar className="w-6 h-6">
                                <AvatarImage
                                  src={profileData.avatar_url}
                                  alt="User avatar"
                                />
                                <AvatarFallback className="text-xs font-medium bg-plant-secondary/20 dark:bg-plant-secondary/30 text-plant-primary dark:text-white transition-colors">
                                  {getInitials()}
                                </AvatarFallback>
                              </Avatar>
                            </span>
                            <span className="text-base">Profile</span>
                          </Button>
                        </SheetClose>
                        <SheetClose asChild>
                          <Button
                            variant="ghost"
                            className="w-full justify-start flex items-center space-x-2 text-red-600 dark:text-red-400"
                            onClick={(event) => handleSignOut(event)}
                          >
                            <LogOut className="w-4 h-4 mr-2" />
                            <span>Sign Out</span>
                          </Button>
                        </SheetClose>
                      </>
                    ) : (
                      <SheetClose asChild>
                        <Button
                          onClick={handleSignIn}
                          className="w-full justify-start bg-plant-secondary hover:bg-plant-secondary/90 text-plant-primary dark:text-white font-medium"
                        >
                          Sign In
                        </Button>
                      </SheetClose>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 px-4 py-6">
                    {user && (
                      <SheetClose asChild>
                        <Link to="/">
                          <Button
                            variant="ghost"
                            className="w-full justify-start text-foreground hover:text-white hover:bg-plant-secondary dark:hover:bg-plant-secondary/90 dark:hover:text-white flex items-center space-x-2 transition-all duration-200 rounded-lg font-medium"
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
                          className="w-full justify-start text-foreground hover:text-white hover:bg-plant-secondary dark:hover:bg-plant-secondary/90 dark:hover:text-white flex items-center space-x-2 transition-all duration-200 rounded-lg font-medium"
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
                            className="w-full justify-start text-foreground hover:text-white hover:bg-plant-secondary dark:hover:bg-plant-secondary/90 dark:hover:text-white flex items-center space-x-2 transition-all duration-200 rounded-lg font-medium"
                          >
                            <Flower2 className="w-4 h-4 mr-2" />
                            <span>My Plants</span>
                          </Button>
                        </Link>
                      </SheetClose>
                    )}
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
