import { useState, useEffect } from 'react';
import { useSimulatedAuth } from '@/hooks/useSimulatedAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Users, 
  FileText, 
  Settings, 
  BarChart3,
  User,
  LogOut,
  Bell,
  TrendingUp,
  Calendar,
  Globe,
  Database,
  Activity,
  UserCheck,
  UserX,
  Clock,
  CheckCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface SystemStats {
  totalUsers: number;
  activeUsers: number;
  totalDocuments: number;
  pendingDocuments: number;
  approvedDocuments: number;
  rejectedDocuments: number;
  totalAgents: number;
  systemUptime: string;
}

interface RecentActivity {
  id: string;
  type: 'user_registration' | 'document_request' | 'document_approved' | 'agent_action';
  description: string;
  timestamp: string;
  user: string;
}

const AdminDashboard = () => {
  const { user, signOut } = useSimulatedAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/auth');
      return;
    }
    
    // Simuler des données statistiques pour la démo
    const mockStats: SystemStats = {
      totalUsers: 1247,
      activeUsers: 892,
      totalDocuments: 3456,
      pendingDocuments: 89,
      approvedDocuments: 3201,
      rejectedDocuments: 166,
      totalAgents: 24,
      systemUptime: '99.8%'
    };

    const mockActivities: RecentActivity[] = [
      {
        id: '1',
        type: 'user_registration',
        description: 'Nouvel utilisateur inscrit',
        timestamp: '2024-01-22 14:30',
        user: 'Marie Diop'
      },
      {
        id: '2',
        type: 'document_approved',
        description: 'Passeport approuvé',
        timestamp: '2024-01-22 14:15',
        user: 'Amadou Fall'
      },
      {
        id: '3',
        type: 'document_request',
        description: 'Nouvelle demande de CIN',
        timestamp: '2024-01-22 13:45',
        user: 'Fatou Sall'
      },
      {
        id: '4',
        type: 'agent_action',
        description: 'Agent a traité 5 demandes',
        timestamp: '2024-01-22 13:30',
        user: 'Agent Diallo'
      },
      {
        id: '5',
        type: 'document_approved',
        description: 'Extrait de naissance approuvé',
        timestamp: '2024-01-22 12:20',
        user: 'Ousmane Ba'
      }
    ];
    
    setStats(mockStats);
    setActivities(mockActivities);
    setLoading(false);
  }, [user, navigate]);

  const handleSignOut = async () => {
    try {
      signOut();
      navigate('/');
      toast({
        title: "Déconnexion réussie",
        description: "À bientôt !",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de la déconnexion",
        variant: "destructive",
      });
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user_registration':
        return <UserCheck className="h-4 w-4 text-green-500" />;
      case 'document_request':
        return <FileText className="h-4 w-4 text-blue-500" />;
      case 'document_approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'agent_action':
        return <Activity className="h-4 w-4 text-purple-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'user_registration':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'document_request':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'document_approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'agent_action':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement du tableau de bord administrateur...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      {/* Header */}
      <header className="bg-white border-b border-border/40 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">SénégalID Admin</h1>
                <p className="text-sm text-muted-foreground">Panneau d'administration</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </Button>
              
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">
                    {user?.first_name} {user?.last_name}
                  </p>
                  <p className="text-xs text-muted-foreground">Administrateur</p>
                </div>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleSignOut}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Tableau de Bord Administrateur
          </h2>
          <p className="text-muted-foreground">
            Vue d'ensemble du système SénégalID et gestion globale de la plateforme.
          </p>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Utilisateurs Total</p>
                  <p className="text-2xl font-bold text-foreground">{stats?.totalUsers.toLocaleString()}</p>
                  <p className="text-xs text-green-600">+12% ce mois</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Utilisateurs Actifs</p>
                  <p className="text-2xl font-bold text-foreground">{stats?.activeUsers.toLocaleString()}</p>
                  <p className="text-xs text-green-600">+8% ce mois</p>
                </div>
                <UserCheck className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Documents Total</p>
                  <p className="text-2xl font-bold text-foreground">{stats?.totalDocuments.toLocaleString()}</p>
                  <p className="text-xs text-blue-600">+156 aujourd'hui</p>
                </div>
                <FileText className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Agents Actifs</p>
                  <p className="text-2xl font-bold text-foreground">{stats?.totalAgents}</p>
                  <p className="text-xs text-purple-600">18 en ligne</p>
                </div>
                <Activity className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Document Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">En Attente</p>
                  <p className="text-2xl font-bold text-foreground">{stats?.pendingDocuments}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Approuvés</p>
                  <p className="text-2xl font-bold text-foreground">{stats?.approvedDocuments.toLocaleString()}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Rejetés</p>
                  <p className="text-2xl font-bold text-foreground">{stats?.rejectedDocuments}</p>
                </div>
                <UserX className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Disponibilité</p>
                  <p className="text-2xl font-bold text-foreground">{stats?.systemUptime}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Activité Récente
                </CardTitle>
                <CardDescription>
                  Dernières actions sur la plateforme
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4 p-4 border border-border rounded-lg hover:shadow-sm transition-shadow">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium text-foreground">{activity.description}</p>
                          <Badge className={getActivityColor(activity.type)} variant="outline">
                            {activity.type.replace('_', ' ')}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Par {activity.user}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                          <Calendar className="h-3 w-3" />
                          {activity.timestamp}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Actions Rapides
                </CardTitle>
                <CardDescription>
                  Gestion et configuration du système
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Gestion des Utilisateurs
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <UserCheck className="h-4 w-4 mr-2" />
                    Gestion des Agents
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Rapports de Documents
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Statistiques Avancées
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Database className="h-4 w-4 mr-2" />
                    Sauvegarde Système
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Globe className="h-4 w-4 mr-2" />
                    Configuration Globale
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* System Health */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  État du Système
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Serveur Principal</span>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      En ligne
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Base de Données</span>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      Opérationnelle
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">API Services</span>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      Actifs
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Stockage</span>
                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                      78% utilisé
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

