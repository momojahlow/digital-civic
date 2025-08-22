import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Clock, Globe, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-image-senegal.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90">
      {/* Motif de fond décoratif */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-secondary rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white rounded-full blur-2xl"></div>
      </div>
      
      <div className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center py-20 px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 animate-fade-in">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white/90 text-sm font-medium">
              <CheckCircle className="h-4 w-4" />
              Plateforme officielle certifiée
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Vos documents d'identité
              <span className="block text-secondary drop-shadow-lg">100% numériques</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl leading-relaxed">
              Simplifiez vos démarches administratives. Demandez, renouvelez et gérez vos documents officiels en ligne depuis n'importe où dans le monde.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              variant="hero" 
              className="text-lg px-8 py-6 group bg-white text-primary hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Commencer maintenant
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 backdrop-blur-sm transition-all duration-300"
            >
              En savoir plus
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
            <div className="flex items-center gap-3 text-white/90 bg-white/10 backdrop-blur-sm rounded-lg p-4 transition-all duration-300 hover:bg-white/15">
              <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-sm">100% Sécurisé</p>
                <p className="text-xs text-white/70">Chiffrement AES-256</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-white/90 bg-white/10 backdrop-blur-sm rounded-lg p-4 transition-all duration-300 hover:bg-white/15">
              <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-sm">24h/7j</p>
                <p className="text-xs text-white/70">Service continu</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-white/90 bg-white/10 backdrop-blur-sm rounded-lg p-4 transition-all duration-300 hover:bg-white/15">
              <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Globe className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-sm">Partout dans le monde</p>
                <p className="text-xs text-white/70">Accès global</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative lg:justify-self-end animate-slide-up">
          <div className="relative group">
            <img 
              src={heroImage}
              alt="Interface de l'application SénégalID avec le drapeau du Sénégal"
              className="w-full max-w-lg rounded-2xl shadow-2xl transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* Carte flottante améliorée */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-2xl border border-gray-100 transition-all duration-300 hover:shadow-3xl hover:-translate-y-1">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center shadow-md">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-base">Sécurité garantie</p>
                  <p className="text-sm text-muted-foreground">Chiffrement AES-256</p>
                </div>
              </div>
            </div>
            
            {/* Indicateurs de statut */}
            <div className="absolute -top-4 -right-4 bg-green-500 text-white rounded-full p-2 shadow-lg animate-pulse">
              <CheckCircle className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

