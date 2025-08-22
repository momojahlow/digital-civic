import { Button } from "@/components/ui/button";
import { Shield, Menu, User, LogOut, Settings, Car, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const { user, profile, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getInitials = (firstName?: string, lastName?: string) => {
    if (!firstName && !lastName) return 'U';
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
  };

  const getDisplayName = (firstName?: string, lastName?: string) => {
    if (!firstName && !lastName) return 'Utilisateur';
    return `${firstName || ''} ${lastName || ''}`.trim();
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg shadow-md transition-transform hover:scale-105">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">SénégalID</h1>
              <p className="text-xs text-muted-foreground">Services Consulaires</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('services')} 
              className="text-foreground hover:text-primary transition-colors duration-200 font-medium relative group"
            >
              Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
            </button>
            <button 
              onClick={() => scrollToSection('process')} 
              className="text-foreground hover:text-primary transition-colors duration-200 font-medium relative group"
            >
              Comment ça marche
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="text-foreground hover:text-primary transition-colors duration-200 font-medium relative group"
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
            </button>
          </nav>

          <div className="flex items-center space-x-3">
            {loading ? (
              <div className="h-10 w-10 bg-muted animate-pulse rounded-full" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 rounded-full p-0 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-10 w-10 ring-2 ring-primary/20 transition-all hover:ring-primary/40">
                        <AvatarImage src="" alt={getDisplayName(profile?.first_name, profile?.last_name)} />
                        <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                          {getInitials(profile?.first_name, profile?.last_name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden md:inline-block text-sm font-medium">
                        {getDisplayName(profile?.first_name, profile?.last_name)}
                      </span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-popover shadow-lg border-border/50" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {getDisplayName(profile?.first_name, profile?.last_name)}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => navigate('/dashboard')}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-muted/50 transition-colors">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profil</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-muted/50 transition-colors">
                    <Car className="mr-2 h-4 w-4" />
                    <span>Mes véhicules</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-muted/50 transition-colors">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Paramètres</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="hover:bg-destructive/10 text-destructive transition-colors">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Se déconnecter</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  className="hidden md:inline-flex hover:bg-muted/50 transition-all duration-200"
                  onClick={() => navigate('/auth')}
                >
                  Se connecter
                </Button>
                <Button 
                  variant="default"
                  className="bg-primary hover:bg-primary/90 transition-all duration-200 shadow-md hover:shadow-lg"
                  onClick={() => navigate('/auth')}
                >
                  Commencer
                </Button>
              </>
            )}
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden hover:bg-muted/50 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Menu mobile */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed top-16 left-0 right-0 bg-background border-b shadow-lg">
            <nav className="container py-6 space-y-4">
              <button 
                onClick={() => scrollToSection('services')} 
                className="block w-full text-left py-2 px-4 text-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-all duration-200 font-medium"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('process')} 
                className="block w-full text-left py-2 px-4 text-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-all duration-200 font-medium"
              >
                Comment ça marche
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="block w-full text-left py-2 px-4 text-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-all duration-200 font-medium"
              >
                Contact
              </button>
              {!user && (
                <div className="pt-4 border-t space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      navigate('/auth');
                      setMobileMenuOpen(false);
                    }}
                  >
                    Se connecter
                  </Button>
                  <Button 
                    variant="default"
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={() => {
                      navigate('/auth');
                      setMobileMenuOpen(false);
                    }}
                  >
                    Commencer
                  </Button>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

