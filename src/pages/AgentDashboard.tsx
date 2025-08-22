import { useState, useEffect } from 'react';
import { useSimulatedAuth } from '@/hooks/useSimulatedAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  User,
  LogOut,
  Bell,
  Search,
  Filter,
  Eye,
  Check,
  X,
  Users,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';

interface DocumentRequest {
  id: string;
  user_name: string;
  user_email: string;
  document_type: string;
  status: 'pending' | 'processing' | 'approved' | 'rejected';
  created_at: string;
  priority: 'normal' | 'urgent';
  progress: number;
}

const AgentDashboard = () => {
  const { user, signOut } = useSimulatedAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [requests, setRequests] = useState<DocumentRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    if (!user || user.role !== 'agent') {
      navigate('/auth');
      return;
    }
    
    // Simuler des données de demandes pour la démo
    const mockRequests: DocumentRequest[] = [
      {
        id: '1',
        user_name: 'Marie Diop',
        user_email: 'marie.diop@email.com',
        document_type: 'Carte Nationale d\'Identité',
        status: 'pending',
        created_at: '2024-01-22',
        priority: 'urgent',
        progress: 10
      },
      {
        id: '2',
        user_name: 'Amadou Ba',
        user_email: 'amadou.ba@email.com',
        document_type: 'Passeport',
        status: 'processing',
        created_at: '2024-01-21',
        priority: 'normal',
        progress: 60
      },
      {
        id: '3',
        user_name: 'Fatou Sall',
        user_email: 'fatou.sall@email.com',
        document_type: 'Extrait de Naissance',
        status: 'pending',
        created_at: '2024-01-20',
        priority: 'normal',
        progress: 5
      },
      {
        id: '4',
        user_name: 'Ousmane Fall',
        user_email: 'ousmane.fall@email.com',
        document_type: 'Carte Consulaire',
        status: 'approved',
        created_at: '2024-01-19',
        priority: 'normal',
        progress: 100
      },
      {
        id: '5',
        user_name: 'Aissatou Diallo',
        user_email: 'aissatou.diallo@email.com',
        document_type: 'Passeport',
        status: 'processing',
        created_at: '2024-01-18',
        priority: 'urgent',
        progress: 85
      }
    ];
    
    setRequests(mockRequests);
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

  const handleStatusChange = (requestId: string, newStatus: 'processing' | 'approved' | 'rejected') => {
    setRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { ...req, status: newStatus, progress: newStatus === 'approved' ? 100 : newStatus === 'processing' ? 50 : 0 }
        : req
    ));
    
    toast({
      title: "Statut mis à jour",
      description: `La demande a été marquée comme ${newStatus === 'approved' ? 'approuvée' : newStatus === 'processing' ? 'en cours' : 'rejetée'}.`,
    });
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
        return <X className="h-4 w-4 text-red-500" />;
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

  const getPriorityColor = (priority: string) => {
    return priority === 'urgent' ? 'bg-red-100 text-red-800 border-red-200' : 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.user_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.document_type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    processing: requests.filter(r => r.status === 'processing').length,
    approved: requests.filter(r => r.status === 'approved').length,
    urgent: requests.filter(r => r.priority === 'urgent').length
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement du tableau de bord agent...</p>
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
                <h1 className="text-xl font-bold text-foreground">SénégalID Agent</h1>
                <p className="text-sm text-muted-foreground">Tableau de bord consulaire</p>
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
                  <p className="text-xs text-muted-foreground">Agent Consulaire</p>
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
            Bonjour, {user?.first_name} !
          </h2>
          <p className="text-muted-foreground">
            Gérez les demandes de documents et validez les dossiers des citoyens.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total demandes</p>
                  <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                </div>
                <FileText className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">En attente</p>
                  <p className="text-2xl font-bold text-foreground">{stats.pending}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">En cours</p>
                  <p className="text-2xl font-bold text-foreground">{stats.processing}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Approuvées</p>
                  <p className="text-2xl font-bold text-foreground">{stats.approved}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Urgentes</p>
                  <p className="text-2xl font-bold text-foreground">{stats.urgent}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtres et Recherche
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher par nom, email ou type de document..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={statusFilter === 'all' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('all')}
                  size="sm"
                >
                  Tous
                </Button>
                <Button
                  variant={statusFilter === 'pending' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('pending')}
                  size="sm"
                >
                  En attente
                </Button>
                <Button
                  variant={statusFilter === 'processing' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('processing')}
                  size="sm"
                >
                  En cours
                </Button>
                <Button
                  variant={statusFilter === 'approved' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('approved')}
                  size="sm"
                >
                  Approuvées
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Requests List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Demandes de Documents ({filteredRequests.length})
            </CardTitle>
            <CardDescription>
              Gérez et validez les demandes des citoyens
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredRequests.map((request) => (
                <div key={request.id} className="border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{request.user_name}</h4>
                        <p className="text-sm text-muted-foreground">{request.user_email}</p>
                        <p className="text-sm font-medium text-foreground mt-1">{request.document_type}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {request.priority === 'urgent' && (
                        <Badge className={getPriorityColor(request.priority)}>
                          Urgent
                        </Badge>
                      )}
                      <Badge className={getStatusColor(request.status)}>
                        {getStatusIcon(request.status)}
                        <span className="ml-1">{getStatusText(request.status)}</span>
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progression</span>
                      <span>{request.progress}%</span>
                    </div>
                    <Progress value={request.progress} className="h-2" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      Demandé le {new Date(request.created_at).toLocaleDateString('fr-FR')}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Voir détails
                      </Button>
                      
                      {request.status === 'pending' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleStatusChange(request.id, 'processing')}
                        >
                          <TrendingUp className="h-4 w-4 mr-2" />
                          Traiter
                        </Button>
                      )}
                      
                      {request.status === 'processing' && (
                        <>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleStatusChange(request.id, 'approved')}
                            className="text-green-600 hover:text-green-700"
                          >
                            <Check className="h-4 w-4 mr-2" />
                            Approuver
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleStatusChange(request.id, 'rejected')}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="h-4 w-4 mr-2" />
                            Rejeter
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredRequests.length === 0 && (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">Aucune demande trouvée</h3>
                  <p className="text-muted-foreground">
                    {searchTerm || statusFilter !== 'all' 
                      ? 'Aucune demande ne correspond à vos critères de recherche.'
                      : 'Aucune demande de document pour le moment.'
                    }
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AgentDashboard;

