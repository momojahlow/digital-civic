import { CheckCircle, Upload, FileCheck, Download, ArrowRight, Clock, Shield, Users } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "1. Téléversez vos documents",
    description: "Scannez et uploadez vos pièces justificatives en toute sécurité",
    details: "Formats acceptés : PDF, JPG, PNG",
    color: "bg-blue-500"
  },
  {
    icon: FileCheck,
    title: "2. Validation automatique",
    description: "Notre système vérifie automatiquement vos documents",
    details: "Vérification en temps réel",
    color: "bg-orange-500"
  },
  {
    icon: CheckCircle,
    title: "3. Traitement consulaire",
    description: "Nos agents valident votre demande sous 48h",
    details: "Suivi en temps réel",
    color: "bg-primary"
  },
  {
    icon: Download,
    title: "4. Récupération",
    description: "Recevez vos documents par courrier ou récupérez-les au consulat",
    details: "Livraison sécurisée",
    color: "bg-purple-500"
  }
];

const features = [
  {
    icon: Clock,
    title: "Traitement rapide",
    description: "48h maximum"
  },
  {
    icon: Shield,
    title: "Sécurité maximale",
    description: "Chiffrement AES-256"
  },
  {
    icon: Users,
    title: "Support dédié",
    description: "Assistance 24/7"
  }
];

const Process = () => {
  return (
    <section id="process" className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 text-sm font-medium mb-4">
            <CheckCircle className="h-4 w-4" />
            Processus simplifié
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Comment ça marche ?
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Un processus simple en 4 étapes pour obtenir vos documents officiels rapidement et en toute sécurité
          </p>
        </div>

        {/* Étapes du processus */}
        <div className="relative mb-16">
          {/* Ligne de connexion pour desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-orange-500 via-primary to-purple-500 opacity-20 -translate-y-1/2 rounded-full" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className={`w-20 h-20 mx-auto ${step.color} rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300 group-hover:shadow-xl`}>
                    <step.icon className="h-10 w-10 text-white" />
                  </div>
                  
                  {/* Flèche pour mobile */}
                  {index < steps.length - 1 && (
                    <div className="lg:hidden flex justify-center mt-4">
                      <ArrowRight className="h-6 w-6 text-muted-foreground" />
                    </div>
                  )}
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    {step.description}
                  </p>
                  <div className="text-sm text-primary font-medium">
                    {step.details}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fonctionnalités */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-4 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Garanties */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20">
            <div className="flex items-center justify-center gap-3 text-primary font-semibold text-lg mb-4">
              <Shield className="h-6 w-6" />
              <span>Processus 100% sécurisé et conforme RGPD</span>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Vos données personnelles sont protégées par un chiffrement de niveau bancaire et ne sont jamais partagées avec des tiers
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;

