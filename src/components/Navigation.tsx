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
import { useNavigate, Link } from "react-router-dom";
import SproutHubLogo from "@/components/SproutHubLogo";
import * as React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Navigation = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = React.useState({
    first_name: "",
    last_name: "",
    avatar_url: "",
  });

  // Fetch profile data only when we have a user, without redirecting
  React.useEffect(() => {
    const fetchProfileData = async () => {
      if (!user) {
        setProfileData({ first_name: "", last_name: "", avatar_url: "" });
        return;
      }

      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("first_name, last_name, avatar_url")
          .eq("id", user.id)
          .single();

        if (error) {
          console.warn("Could not fetch profile data:", error);
          return;
        }

        setProfileData({
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          avatar_url: data.avatar_url || "",
        });
      } catch (error) {
        console.warn("Error fetching profile:", error);
      }
    };

    fetchProfileData();
  }, [user]);

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
    <nav className="bg-white shadow-sm border-b border-plant-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="group">
            <SproutHubLogo size="md" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-4">
            {user && (
              <Link to="/">
                <Button
                  variant="ghost"
                  className="text-plant-text hover:text-plant-primary flex items-center space-x-2"
                >
                  <Home className="w-4 h-4" />
                  <span>Dashboard</span>
                </Button>
              </Link>
            )}
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
                    className="text-plant-text hover:text-plant-primary p-0 !border-none !ring-0 !outline-none !focus:outline-none !focus-visible:outline-none focus:shadow-none focus-visible:shadow-none rounded-full data-[state=open]:outline-none data-[state=open]:ring-0 data-[state=open]:shadow-none"
                    style={{
                      background: "none",
                      border: "none",
                      outline: "none",
                      boxShadow: "none",
                      boxSizing: "border-box",
                    }}
                  >
                    <Avatar
                      className="w-10 h-10 transition-colors hover:bg-plant-primary/30"
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
                      <AvatarFallback className="text-xs font-medium bg-plant-secondary/20 transition-colors">
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
                    className="text-red-600 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={handleSignIn}
                className="bg-plant-primary hover:bg-plant-primary/90"
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
                  className="w-12 h-12"
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
                                <AvatarFallback className="text-xs font-medium bg-plant-secondary/20 transition-colors">
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
                            className="w-full justify-start flex items-center space-x-2 text-red-600"
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
                          className="w-full justify-start bg-plant-primary hover:bg-plant-primary/90"
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
                            className="w-full justify-start text-plant-text hover:text-plant-primary flex items-center space-x-2"
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
                          className="w-full justify-start text-plant-text hover:text-plant-primary flex items-center space-x-2"
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
                            className="w-full justify-start text-plant-text hover:text-plant-primary flex items-center space-x-2"
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
