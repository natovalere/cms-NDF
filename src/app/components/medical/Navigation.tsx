import { useState, useRef } from "react";
import {
  Menu,
  X,
  Phone,
  Eye,
  EyeOff,
  AlertCircle,
  Lock,
  ArrowLeft,
} from "lucide-react";
import logo from "@/assets/logo-centre.jpg";
import { ADMINS, connecterAdmin, nomComplet } from "@/medical/admins";

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  // Étape 1 = choix du compte | Étape 2 = formulaire de connexion
  const [etape, setEtape] = useState<1 | 2>(1);
  const [adminChoisi, setAdminChoisi] = useState<(typeof ADMINS)[0] | null>(
    null,
  );

  const [motDePasse, setMotDePasse] = useState("");
  const [afficherMdp, setAfficherMdp] = useState(false);
  const [erreur, setErreur] = useState("");
  const [chargement, setChargement] = useState(false);

  const logoClicks = useRef(0);
  const logoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navItems = [
    { id: "home", label: "Accueil" },
    { id: "about", label: "À Propos" },
    { id: "services", label: "Services" },
    { id: "appointment", label: "Rendez-vous" },
    { id: "location", label: "Localisation" },
  ];

  // â”€â”€â”€ 5 clics rapides sur le logo = ouvre la modal â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const handleLogoClick = () => {
    logoClicks.current += 1;
    if (logoTimer.current) clearTimeout(logoTimer.current);
    logoTimer.current = setTimeout(() => {
      logoClicks.current = 0;
    }, 2000);

    if (logoClicks.current >= 5) {
      logoClicks.current = 0;
      setShowAdminLogin(true);
      setEtape(1);
      return;
    }
    if (logoClicks.current === 1) onNavigate("home");
  };

  // — Sélectionner un compte → passer à l'étape 2 —
  const choisirAdmin = (admin: (typeof ADMINS)[0]) => {
    setAdminChoisi(admin);
    setMotDePasse("");
    setErreur("");
    setAfficherMdp(false);
    setEtape(2);
  };

  // â”€â”€â”€ Connexion avec le mot de passe â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const handleConnexion = async () => {
    setErreur("");
    if (!motDePasse.trim()) {
      setErreur("Veuillez entrer votre mot de passe.");
      return;
    }
    if (!adminChoisi) return;

    setChargement(true);
    const admin = await connecterAdmin(adminChoisi.email, motDePasse);
    setChargement(false);
    if (admin) {
      fermerModal();
      onNavigate("admin");
    } else {
      setErreur("Mot de passe incorrect. Réessayez.");
    }
  };

  // — Fermeture complète de la modal —
  const fermerModal = () => {
    setShowAdminLogin(false);
    setEtape(1);
    setAdminChoisi(null);
    setMotDePasse("");
    setErreur("");
    setAfficherMdp(false);
  };

  return (
    <>
      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• NAVBAR â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo responsive */}
            <div
              className="flex items-center cursor-pointer select-none"
              onClick={handleLogoClick}
              title="Centre Médico-Social Notre Dame de Fatima"
            >
              <img
                src={logo}
                alt="Logo Centre Médico-Social Notre Dame de Fatima"
                className="h-10 sm:h-12 md:h-14 w-auto object-contain rounded-lg transition-opacity hover:opacity-90"
              />
            </div>

            {/* Navigation desktop */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    currentPage === item.id
                      ? "bg-[#2563EB] text-white"
                      : "text-[#1F2937] hover:bg-[#F3F4F6]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Téléphone */}
            <div className="hidden lg:flex items-center">
              <a
                href="tel:+22870842222"
                className="flex items-center text-sm text-[#1F2937] hover:text-[#10B981] transition-colors"
              >
                <Phone className="w-4 h-4 mr-2 text-[#10B981]" />
                +228 70 84 22 22 <br />
                +228 79 79 04 79
              </a>
            </div>

            {/* Bouton menu mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-[#F3F4F6]"
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[#1F2937]" />
              ) : (
                <Menu className="w-6 h-6 text-[#1F2937]" />
              )}
            </button>
          </div>

          {/* Menu mobile */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-[#E5E7EB]">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    currentPage === item.id
                      ? "bg-[#2563EB] text-white"
                      : "text-[#1F2937] hover:bg-[#F3F4F6]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <a
                href="tel:+22870842222"
                className="flex items-center gap-2 px-4 py-3 text-sm text-[#10B981]"
              >
                <Phone className="w-4 h-4" /> +228 70 84 22 22
              </a>
            </div>
          )}
        </div>
      </nav>

      {/*  MODAL CONNEXION ADMIN */}
      {showAdminLogin && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] px-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) fermerModal();
          }}
        >
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-xl overflow-hidden">
            {/* En-tête bleu */}
            <div className="bg-[#2563EB] px-6 py-5 text-white">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
                  <Lock className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-semibold">Accès Administrateur</h2>
              </div>
              <p className="text-sm text-white/75 ml-12">
                Centre Médico-Social Notre Dame de Fatima
              </p>
            </div>

            {/* — ÉTAPE 1 : Choisir son compte — */}
            {etape === 1 && (
              <div className="px-6 py-6">
                <p className="text-sm text-[#6B7280] mb-4 text-center">
                  Sélectionnez votre compte pour vous connecter
                </p>

                <div className="space-y-3">
                  {ADMINS.map((admin) => (
                    <button
                      key={admin.id}
                      onClick={() => choisirAdmin(admin)}
                      className="w-full flex items-center gap-4 p-4 rounded-xl border border-[#E5E7EB] hover:border-[#2563EB] hover:bg-[#EFF6FF] transition-all group text-left"
                    >
                      {/* Avatar initiales */}
                      <div className="w-11 h-11 bg-[#2563EB] rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0">
                        {admin.avatar}
                      </div>
                      {/* Infos */}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-[#1F2937] text-sm">
                          {nomComplet(admin)}
                        </p>
                        <p className="text-xs text-[#6B7280] mt-0.5">
                          {admin.role}
                        </p>
                        <p className="text-xs text-[#9CA3AF] mt-0.5 truncate">
                          {admin.email}
                        </p>
                      </div>
                      {/* Flèche */}
                      <span className="text-[#2563EB] text-xl opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                        <ArrowLeft className="w-4 h-4 rotate-180" />
                      </span>
                    </button>
                  ))}
                </div>

                <button
                  onClick={fermerModal}
                  className="w-full mt-4 px-4 py-2.5 rounded-xl border border-[#E5E7EB] text-[#6B7280] text-sm hover:bg-[#F9FAFB] transition-colors"
                >
                  Annuler
                </button>
              </div>
            )}

            {/* — ÉTAPE 2 : Formulaire mot de passe — */}
            {etape === 2 && adminChoisi && (
              <div className="px-6 py-6 space-y-4">
                {/* Retour + info compte sélectionné */}
                <div className="flex items-center gap-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-3">
                  <button
                    onClick={() => {
                      setEtape(1);
                      setErreur("");
                      setMotDePasse("");
                    }}
                    className="text-[#6B7280] hover:text-[#1F2937] transition-colors"
                    title="Changer de compte"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <div className="w-9 h-9 bg-[#2563EB] rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {adminChoisi.avatar}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#1F2937] truncate">
                      {nomComplet(adminChoisi)}
                    </p>
                    <p className="text-xs text-[#6B7280]">{adminChoisi.role}</p>
                  </div>
                </div>

                {/* Champ email (pré-rempli, lecture seule) */}
                <div>
                  <label
                    htmlFor="admin-email"
                    className="block text-sm font-medium text-[#374151] mb-1.5"
                  >
                    Email
                  </label>
                  <input
                    id="admin-email"
                    type="email"
                    value={adminChoisi?.email ?? ""}
                    readOnly
                    className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-xl text-sm bg-[#F9FAFB] text-[#6B7280] cursor-default"
                  />
                </div>

                {/* Champ mot de passe */}
                <div>
                  <label
                    htmlFor="admin-password"
                    className="block text-sm font-medium text-[#374151] mb-1.5"
                  >
                    Mot de passe
                  </label>
                  <div className="relative">
                    <input
                      id="admin-password"
                      type={afficherMdp ? "text" : "password"}
                      value={motDePasse}
                      onChange={(e) => {
                        setMotDePasse(e.target.value);
                        setErreur("");
                      }}
                      onKeyDown={(e) => e.key === "Enter" && handleConnexion()}
                      placeholder="Entrez votre mot de passe"
                      autoFocus
                      className="w-full px-4 py-2.5 pr-11 border border-[#D1D5DB] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setAfficherMdp(!afficherMdp)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280] transition-colors"
                      tabIndex={-1}
                    >
                      {afficherMdp ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Erreur */}
                {erreur && (
                  <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {erreur}
                  </div>
                )}

                {/* Boutons */}
                <div className="flex gap-3 pt-1">
                  <button
                    onClick={fermerModal}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-[#E5E7EB] text-[#6B7280] text-sm hover:bg-[#F9FAFB] transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleConnexion}
                    disabled={chargement}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-[#2563EB] text-white text-sm font-medium hover:bg-[#1D4ED8] disabled:opacity-60 transition-colors"
                  >
                    {chargement ? "Connexion…" : "Se connecter"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
