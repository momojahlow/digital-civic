import { useState, useEffect } from 'react';
import { useSimulatedAuth } from '@/hooks/useSimulatedAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  FileText, 
  CreditCard, 
  MapPin, 
  UserCheck, 
  Plus, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  User,
  Settings,
  LogOut,
  Bell,
  Download,
  Eye
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface DocumentRequest {
  id: string;
  document_type: string;
  status: 'pending' | 'processing' | 'approved' | 'rejected';
  created_at: string;
  progress: number;
}

const Dashboard = () => {
  const { user, signOut } = useSimulatedAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<DocumentRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'citizen') {
      navigate('/auth');
      return;
    }
    
    // Simuler des données de documents pour la démo
    const mockDocuments: DocumentRequest[] = [
      {
        id: '1',
        document_type: 'Carte Nationale d\'Identité',
        status: 'processing',
        created_at: '2024-01-15',
        progress: 75
      },
      {
        id: '2',
        document_type: 'Passeport',
        status: 'approved',
        created_at: '2024-01-10',
        progress: 100
      },
      {
        id: '3',
        document_type: 'Extrait de Naissance',
        status: 'pending',
        created_at: '2024-01-20',
        progress: 25
      }
    ];
    
    setDocuments(mockDocuments);
    setLoading(false);
  }, [user, navigate]);

  const handleSignOut = async () => {
    try {
      await signOut();
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'processing':
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'En attente';
      case 'processing':
        return 'En cours';
      case 'approved':
        return 'Approuvé';
      case 'rejected':
        return 'Rejeté';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const serviceTypes = [
    {
      icon: CreditCard,
      title: "Carte Nationale d'Identité",
      description: "Demande et renouvellement de votre CIN",
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200"
    },
    {
      icon: FileText,
      title: "Passeport",
      description: "Obtenez votre passeport depuis n'importe où",
      color: "text-primary",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      icon: MapPin,
      title: "Carte Consulaire",
      description: "Services consulaires pour les Sénégalais à l'étranger",
      color: "text-secondary",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200"
    },
    {
      icon: UserCheck,
      title: "Extrait de Naissance",
      description: "Copies et extraits d'actes de naissance",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement de votre tableau de bord...</p>
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
                <h1 className="text-xl font-bold text-foreground">SénégalID</h1>
                <p className="text-sm text-muted-foreground">Tableau de bord</p>
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
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
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
            Bienvenue, {user?.first_name || 'Utilisateur'} !
          </h2>
          <p className="text-muted-foreground">
            Gérez vos documents d'identité et suivez vos demandes en cours.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Documents actifs</p>
                  <p className="text-2xl font-bold text-foreground">{documents.length}</p>
                </div>
                <FileText className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">En cours</p>
                  <p className="text-2xl font-bold text-foreground">
                    {documents.filter(d => d.status === 'processing').length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Approuvés</p>
                  <p className="text-2xl font-bold text-foreground">
                    {documents.filter(d => d.status === 'approved').length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">En attente</p>
                  <p className="text-2xl font-bold text-foreground">
                    {documents.filter(d => d.status === 'pending').length}
                  </p>
                </div>
                <AlertCircle className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Documents en cours */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Mes Documents
                </CardTitle>
                <CardDescription>
                  Suivez l'état de vos demandes de documents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {documents.map((doc) => (
                    <div key={doc.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(doc.status)}
                          <div>
                            <h4 className="font-medium text-foreground">{doc.document_type}</h4>
                            <p className="text-sm text-muted-foreground">
                              Demandé le {new Date(doc.created_at).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(doc.status)}>
                          {getStatusText(doc.status)}
                        </Badge>
                      </div>
                      
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progression</span>
                          <span>{doc.progress}%</span>
                        </div>
                        <Progress value={doc.progress} className="h-2" />
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Voir détails
                        </Button>
                        {doc.status === 'approved' && (
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Télécharger
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Nouvelle demande */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Nouvelle Demande
                </CardTitle>
                <CardDescription>
                  Sélectionnez le type de document à demander
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {serviceTypes.map((service, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className={`w-full justify-start h-auto p-4 ${service.borderColor} hover:${service.bgColor}`}
                    >
                      <div className={`w-10 h-10 rounded-lg ${service.bgColor} flex items-center justify-center mr-3`}>
                        <service.icon className={`h-5 w-5 ${service.color}`} />
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-sm">{service.title}</p>
                        <p className="text-xs text-muted-foreground">{service.description}</p>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions rapides */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Actions Rapides
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    <User className="h-4 w-4 mr-2" />
                    Mon Profil
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Bell className="h-4 w-4 mr-2" />
                    Notifications
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Settings className="h-4 w-4 mr-2" />
                    Paramètres
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

