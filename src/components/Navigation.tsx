
import { Search, Droplets, Home, BookOpen, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-plant-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-plant-primary rounded-full flex items-center justify-center">
              <Droplets className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-semibold text-plant-primary font-poppins">SproutHub</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Button variant="ghost" className="text-plant-text hover:text-plant-primary flex items-center space-x-2">
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Button>
            <Button variant="ghost" className="text-plant-text hover:text-plant-primary flex items-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span>Plant Catalog</span>
            </Button>
            <Button variant="ghost" className="text-plant-text hover:text-plant-primary flex items-center space-x-2">
              <Droplets className="w-4 h-4" />
              <span>My Plants</span>
            </Button>
            <Button variant="ghost" className="text-plant-text hover:text-plant-primary">
              <Search className="w-4 h-4" />
            </Button>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-plant-text hover:text-plant-primary">
                    <User className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
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
                onClick={() => navigate('/auth')} 
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
