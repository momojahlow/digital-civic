import { Shield, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white relative overflow-hidden">
      {/* Motif de fond décoratif */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-secondary rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="container py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo et description */}
          <div className="space-y-6 lg:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg shadow-lg">
                <Shield className="h-7 w-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">SénégalID</h3>
                <p className="text-sm text-white/80">Services Consulaires</p>
              </div>
            </div>
            <p className="text-white/90 leading-relaxed">
              Plateforme officielle pour la digitalisation des documents d'identité sénégalais. Simplifiez vos démarches administratives.
            </p>
            
            {/* Réseaux sociaux */}
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="hover:bg-white/20 text-white/80 hover:text-white transition-all duration-200">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-white/20 text-white/80 hover:text-white transition-all duration-200">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-white/20 text-white/80 hover:text-white transition-all duration-200">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-white/20 text-white/80 hover:text-white transition-all duration-200">
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-6 text-lg text-white">Services</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/80 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">Carte Nationale d'Identité</a></li>
              <li><a href="#" className="text-white/80 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">Passeport</a></li>
              <li><a href="#" className="text-white/80 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">Carte Consulaire</a></li>
              <li><a href="#" className="text-white/80 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">Extrait de Naissance</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-6 text-lg text-white">Support</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/80 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">Centre d'aide</a></li>
              <li><a href="#" className="text-white/80 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">FAQ</a></li>
              <li><a href="#" className="text-white/80 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">Guide d'utilisation</a></li>
              <li><a href="#" className="text-white/80 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">Tutoriels vidéo</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-6 text-lg text-white">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-white/90 hover:text-white transition-colors group">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">+221 33 XXX XX XX</p>
                  <p className="text-xs text-white/70">Lun-Ven 8h-18h</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-white/90 hover:text-white transition-colors group">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">contact@senegalid.sn</p>
                  <p className="text-xs text-white/70">Réponse sous 24h</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-white/90 hover:text-white transition-colors group">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">Dakar, Sénégal</p>
                  <p className="text-xs text-white/70">Ministère des Affaires Étrangères</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Séparateur */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/80 text-sm text-center md:text-left">
              © 2024 SénégalID. Tous droits réservés. Ministère des Affaires Étrangères de la République du Sénégal.
            </p>
            
            <div className="flex flex-wrap justify-center md:justify-end gap-6">
              <a href="#" className="text-white/80 hover:text-white text-sm transition-colors hover:underline">
                Politique de confidentialité
              </a>
              <a href="#" className="text-white/80 hover:text-white text-sm transition-colors hover:underline">
                Conditions d'utilisation
              </a>
              <a href="#" className="text-white/80 hover:text-white text-sm transition-colors hover:underline">
                Sécurité des données
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bouton retour en haut */}
      <Button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-secondary hover:bg-secondary/90 text-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        size="icon"
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
    </footer>
  );
};

export default Footer;

