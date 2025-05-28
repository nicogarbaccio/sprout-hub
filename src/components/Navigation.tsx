import {
  Search,
  Droplets,
  Home,
  BookOpen,
  User,
  LogOut,
  Menu,
  X,
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
            <SproutHubLogo size="md" />
          </Link>

          {/* Desktop Nav */}
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

          {/* Mobile Hamburger Menu */}
          <div className="md:hidden flex items-center">
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
                            className="w-full justify-start flex items-center space-x-2"
                            onClick={() => navigate("/profile")}
                          >
                            <User className="w-4 h-4 mr-2" />
                            <span>Profile</span>
                          </Button>
                        </SheetClose>
                        <SheetClose asChild>
                          <Button
                            variant="ghost"
                            className="w-full justify-start flex items-center space-x-2 text-red-600"
                            onClick={handleSignOut}
                          >
                            <LogOut className="w-4 h-4 mr-2" />
                            <span>Sign Out</span>
                          </Button>
                        </SheetClose>
                      </>
                    ) : (
                      <SheetClose asChild>
                        <Button
                          onClick={() => navigate("/auth")}
                          className="w-full justify-start bg-plant-primary hover:bg-plant-primary/90"
                        >
                          Sign In
                        </Button>
                      </SheetClose>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 px-4 py-6">
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
                            <Droplets className="w-4 h-4 mr-2" />
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
