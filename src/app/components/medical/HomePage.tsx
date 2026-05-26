import { Stethoscope, Shield, Heart } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* ── Hero Section ── */}
      <section className="relative bg-gradient-to-br from-[#2563EB] to-[#10B981] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Texte gauche */}
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Centre Médico-social
              </h1>
              <p className="text-xl text-white/90 mb-2">Notre Dame de Fatima</p>
              <p className="text-lg text-white/80 mb-8">
                Des soins de qualité avec compassion et professionnalisme
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => onNavigate("appointment")}
                  className="px-8 py-3 bg-white text-[#2563EB] font-semibold rounded-lg hover:shadow-lg transition-shadow"
                >
                  Prendre un rendez-vous
                </button>
                <button
                  onClick={() => onNavigate("services")}
                  className="px-8 py-3 bg-white/20 text-white font-semibold rounded-lg border-2 border-white hover:bg-white/30 transition-colors"
                >
                  Voir nos services
                </button>
              </div>
            </div>

            {/* ── Image à droite */}
            <div className="hidden md:block">
              <div className="bg-white/20 rounded-2xl p-3 backdrop-blur-sm border border-white/30 shadow-xl">
                <img
                  src={heroImage}
                  alt="Centre Médico-Social Notre Dame de Fatima"
                  className="block w-full h-80 lg:h-80 object-cover object-center rounded-xl"
                />

                <p className="text-white text-sm text-center mt-3 pb-1 font-medium">
                  Accédez à des services médicaux de qualité 24h/24, 7j/7
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#1F2937] mb-12">
            Pourquoi nous choisir ?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Stethoscope className="w-8 h-8" />,
                title: "Médecins Expérimentés",
                description:
                  "Une équipe de professionnels de santé qualifiés et dévoués",
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Soins de Qualité",
                description:
                  "Services médicaux modernes et équipements de pointe",
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Sécurité Garantie",
                description:
                  "Normes médicales strictes et respect de la confidentialité",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-[#F9FAFB] rounded-xl p-6 hover:shadow-lg transition-shadow border border-[#E5E7EB]"
              >
                <div className="w-12 h-12 bg-[#EFF6FF] rounded-lg flex items-center justify-center text-[#2563EB] mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-[#1F2937] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#6B7280]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services Preview ── */}
      <section className="bg-[#F9FAFB] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#1F2937] mb-12">
            Nos services
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {[
              {
                title: "Consultations Médicales",
                description:
                  "Médecine générale, gynécologie, pédiatrie et bien d'autres",
              },
              {
                title: "Examens et Diagnostics",
                description: "Laboratoires et analyses complètes",
              },
              {
                title: "Soins Spécialisés",
                description:
                  "Cardiologie, ophtalmologie, chirurgie et plus encore",
              },
              {
                title: "Services d'Urgence",
                description: "Prise en charge rapide disponible 24h/24 et 7j/7",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 border border-[#E5E7EB] hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-[#1F2937] mb-2">
                  {service.title}
                </h3>
                <p className="text-[#6B7280]">{service.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button
              onClick={() => onNavigate("services")}
              className="px-8 py-3 bg-[#2563EB] text-white font-semibold rounded-lg hover:bg-[#1D4ED8] transition-colors"
            >
              Découvrir tous les services
            </button>
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="bg-[#2563EB] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Besoin d'aide ?</h2>
          <p className="text-xl text-white/90 mb-8">
            Contactez-nous dès maintenant pour une consultation ou un
            rendez-vous
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate("appointment")}
              className="px-8 py-3 bg-white text-[#2563EB] font-semibold rounded-lg hover:shadow-lg transition-shadow"
            >
              Rendez-vous
            </button>
            <button
              onClick={() => onNavigate("location")}
              className="px-8 py-3 bg-white/20 text-white font-semibold rounded-lg border-2 border-white hover:bg-white/30 transition-colors"
            >
              Localisation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
