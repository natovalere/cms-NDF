import { Phone, Mail, MapPin, Heart } from "lucide-react";
import logo from "@/assets/logo-centre.jpg";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1F2937] text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3 overflow-hidden">
                <img
                  src={logo}
                  alt="Logo du centre"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg">Centre Medico-social</h3>
                <p className="text-sm text-white/80">Notre Dame de Fatima</p>
              </div>
            </div>
            <p className="text-white/70 text-sm">
              Votre santé est notre priorité. Des soins de qualité avec
              compassion et professionnalisme.
            </p>
          </div>

          <div>
            <h4 className="mb-4">Liens Rapides</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Accueil
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  À propos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Rendez-vous
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4">Nos Services</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>Consultation générale</li>
              <li>Consultations spécialisées</li>
              <li>Laboratoire</li>
              <li>Pharmacie</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4">Contact</h4>
            <div className="space-y-3 text-sm text-white/70">
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-1 flex-shrink-0" />
                <div>
                  <p>+228 70 84 22 22</p>
                  <p>+228 79 79 04 79</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-1 flex-shrink-0" />
                <p className="break-all">cms.notredamefatima@gmail.com</p>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <p>
                  Avedji <br />
                  Lomé, Togo
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/70">
            © {currentYear} Centre Medico-social Catholique Notre Dame de
            Fatima. Tous droits réservés.
          </p>
          <div className="flex items-center gap-2 text-sm text-white/70">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-[#10B981] fill-current" />
            <span>pour votre santé</span>

            <span className="text-white/25"> • Développé par NATO Valère</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
