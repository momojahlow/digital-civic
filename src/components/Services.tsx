import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, FileText, MapPin, UserCheck, ArrowRight, Clock, Shield, Zap } from "lucide-react";

const services = [
  {
    icon: CreditCard,
    title: "Carte Nationale d'Identité",
    description: "Demande et renouvellement de votre CIN en ligne",
    features: ["Première demande", "Renouvellement", "Suivi en temps réel"],
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    hoverColor: "hover:bg-red-600"
  },
  {
    icon: FileText,
    title: "Passeport",
    description: "Obtenez votre passeport depuis n'importe où",
    features: ["Passeport ordinaire", "Passeport diplomatique", "Urgence disponible"],
    color: "text-primary",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    hoverColor: "hover:bg-primary"
  },
  {
    icon: MapPin,
    title: "Carte Consulaire",
    description: "Services consulaires pour les Sénégalais à l'étranger",
    features: ["Inscription consulaire", "Renouvellement", "Changement d'adresse"],
    color: "text-secondary",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    hoverColor: "hover:bg-secondary"
  },
  {
    icon: UserCheck,
    title: "Extrait de Naissance",
    description: "Copies et extraits d'actes de naissance",
    features: ["Extrait intégral", "Copie certifiée", "Livraison numérique"],
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    hoverColor: "hover:bg-blue-600"
  }
];

const stats = [
  { icon: Clock, value: "48h", label: "Délai moyen" },
  { icon: Shield, value: "100%", label: "Sécurisé" },
  { icon: Zap, value: "24/7", label: "Disponible" }
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 text-sm font-medium mb-4">
            <Shield className="h-4 w-4" />
            Services officiels
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Nos Services
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Tous vos documents d'identité accessibles en quelques clics, avec un processus simplifié et sécurisé
          </p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className={`group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white border-2 ${service.borderColor} hover:border-transparent overflow-hidden relative`}
            >
              {/* Effet de survol - couleur de fond */}
              <div className={`absolute inset-0 ${service.hoverColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              <CardHeader className="text-center pb-4 relative z-10">
                <div className={`w-16 h-16 mx-auto rounded-xl ${service.bgColor} flex items-center justify-center mb-4 group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110`}>
                  <service.icon className={`h-8 w-8 ${service.color} group-hover:text-white transition-colors duration-300`} />
                </div>
                <CardTitle className="text-xl mb-2 text-foreground group-hover:text-white transition-colors duration-300">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground group-hover:text-white/90 transition-colors duration-300">
                  {service.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-4 relative z-10">
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-muted-foreground group-hover:text-white/90 transition-colors duration-300">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3 group-hover:bg-white transition-colors duration-300" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  variant="outline" 
                  className="w-full border-border text-foreground hover:bg-white hover:text-foreground group-hover:bg-white group-hover:text-foreground group-hover:border-white transition-all duration-300 hover:shadow-lg"
                >
                  Commencer
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-border/50">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Besoin d'aide pour choisir ?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Notre équipe d'experts est là pour vous accompagner dans vos démarches administratives
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-300">
              Contacter un conseiller
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;

