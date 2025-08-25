
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Shield, Eye, EyeOff, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useSimulatedAuth } from '@/hooks/useSimulatedAuth';
import { Alert, AlertDescription } from '@/components/ui/alert';

const SimulatedAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, signIn, signUp } = useSimulatedAuth();

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      const dashboardRoute = getDashboardRoute(user.role);
      navigate(dashboardRoute);
    }
  }, [user, navigate]);

  const getDashboardRoute = (role: string) => {
    switch (role) {
      case 'admin':
        return '/admin-dashboard';
      case 'agent':
        return '/agent-dashboard';
      case 'citizen':
      default:
        return '/dashboard';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const result = await signIn(email, password);
        
        if (result.success) {
          toast({
            title: "Connexion réussie",
            description: "Vous êtes maintenant connecté.",
          });
          
          // La redirection sera gérée par l'useEffect
        } else {
          toast({
            title: "Erreur de connexion",
            description: result.error || "Email ou mot de passe incorrect",
            variant: "destructive",
          });
        }
      } else {
        const result = await signUp(email, password, firstName, lastName, phone);
        
        if (result.success) {
          toast({
            title: "Inscription réussie",
            description: "Bienvenue ! Vous êtes maintenant connecté.",
          });
          
          // La redirection sera gérée par l'useEffect
        } else {
          toast({
            title: "Erreur d'inscription",
            description: result.error || "Une erreur s'est produite",
            variant: "destructive",
          });
        }
      }
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Une erreur inattendue s'est produite",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fillTestCredentials = (role: 'citizen' | 'agent' | 'admin') => {
    setEmail(`test.${role}@example.com`);
    setPassword('password');
    setIsLogin(true);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <Card>
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-lg">
                <Shield className="h-7 w-7 text-primary-foreground" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">
              {isLogin ? 'Se connecter' : "S'inscrire"}
            </CardTitle>
            <CardDescription>
              {isLogin 
                ? 'Connectez-vous à votre compte SénégalID' 
                : 'Créez votre compte SénégalID'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        disabled={loading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom</Label>
                      <Input
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+221 XX XXX XX XX"
                      disabled={loading}
                    />
                  </div>
                </>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Chargement...' : (isLogin ? 'Se connecter' : "S'inscrire")}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Button
                variant="link"
                onClick={() => setIsLogin(!isLogin)}
                disabled={loading}
                className="text-sm"
              >
                {isLogin 
                  ? "Pas de compte ? S'inscrire" 
                  : 'Déjà un compte ? Se connecter'
                }
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Comptes de test */}
        {isLogin && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Info className="h-5 w-5" />
                Comptes de Test
              </CardTitle>
              <CardDescription>
                Utilisez ces comptes pour tester les différents dashboards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => fillTestCredentials('citizen')}
                  disabled={loading}
                >
                  <div className="text-left">
                    <div className="font-medium">👤 Utilisateur Citoyen</div>
                    <div className="text-sm text-muted-foreground">test.citizen@example.com</div>
                  </div>
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => fillTestCredentials('agent')}
                  disabled={loading}
                >
                  <div className="text-left">
                    <div className="font-medium">👨‍💼 Agent Consulaire</div>
                    <div className="text-sm text-muted-foreground">test.agent@example.com</div>
                  </div>
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => fillTestCredentials('admin')}
                  disabled={loading}
                >
                  <div className="text-left">
                    <div className="font-medium">⚙️ Administrateur</div>
                    <div className="text-sm text-muted-foreground">test.admin@example.com</div>
                  </div>
                </Button>
              </div>
              
              <Alert className="mt-4">
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Mot de passe pour tous les comptes : <strong>password</strong>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SimulatedAuth;
