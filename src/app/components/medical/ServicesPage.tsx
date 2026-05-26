import {
  Stethoscope,
  Baby,
  Eye,
  FlaskConical,
  Pill,
  HeartPulse,
  Activity,
  Dumbbell,
  Scissors,
  Scan,
  UserRound,
  Bed,
  Building2,
} from "lucide-react";

export function ServicesPage() {
  const services = [
    {
      category: "Consultations Médicales",
      items: [
        {
          name: "Médecine Générale",
          description:
            "Consultations médicales pour tous types de problèmes de santé, disponibles 24h/24 et 7j/7.",
          icon: Stethoscope,
        },
        {
          name: "Gynécologie",
          description:
            "Suivi médical de la femme, grossesse et santé reproductive.",
          icon: UserRound,
        },
        {
          name: "Ophtalmologie",
          description:
            "Diagnostic et traitement des maladies des yeux et de la vision.",
          icon: Eye,
        },
        {
          name: "Cardiologie",
          description:
            "Prise en charge des maladies du cœur et du système cardiovasculaire.",
          icon: HeartPulse,
        },
        {
          name: "Dermatologie",
          description:
            "Traitement des maladies de la peau, des cheveux et des ongles.",
          icon: Activity,
        },
        {
          name : "rhumatologie",
          description : "Prise en charge des maladies des articulations, des muscles et des os.",
          icon : Building2, 
        },
        {
          name: "maternité",
          description:
            "Suivi de grossesse, accouchement et soins postnataux.",
          icon: Baby, 
        },
        {
          name: "kinésithérapie",
          description:
            "Rééducation fonctionnelle et traitement des douleurs musculaires.",
          icon: Dumbbell,   
        }

      ],
    },
    {
      category: "Examens & Soins Spécialisés",
      items: [
        {
          name: "Laboratoire",
          description:
            "Analyses médicales complètes avec des résultats fiables et rapides.",
          icon: FlaskConical,
        },
        {
          name: "Échographie",
          description:
            "Examens échographiques pour le suivi médical et obstétrical.",
          icon: Scan,
        },
        
        {
          name: "Petite Chirurgie",
          description:
            "Interventions chirurgicales simples réalisées en toute sécurité.",
          icon: Scissors,
        },
      ],
    },
    {
      category: "Hospitalisation & Services Complémentaires",
      items: [
        
        {
          name: "Hospitalisation",
          description:
            "Prise en charge des patients nécessitant une surveillance médicale continue.",
          icon: Bed,
        },
        {
          name: "Pharmacie",
          description:
            "Vente de médicaments et conseils pharmaceutiques professionnels.",
          icon: Pill,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl mb-4 text-[#1F2937]">Nos Services</h1>

          <p className="text-xl text-[#6B7280] max-w-3xl mx-auto">
            Nous mettons à votre disposition une large gamme de services
            médicaux pour garantir votre santé et votre bien-être.
          </p>
        </div>

        {/* Services */}
        <div className="space-y-12">
          {services.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h2 className="text-2xl mb-6 text-[#1F2937] flex items-center gap-3">
                <div className="w-1 h-8 bg-[#2563EB] rounded"></div>
                {section.category}
              </h2>

              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                {section.items.map((service, serviceIndex) => {
                  const Icon = service.icon;

                  return (
                    <div
                      key={serviceIndex}
                      className="bg-white border-2 border-[#E5E7EB] rounded-xl p-6 hover:border-[#2563EB] hover:shadow-lg transition-all"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-[#2563EB] to-[#10B981] rounded-xl flex items-center justify-center mb-4">
                        <Icon className="w-8 h-8 text-white" />
                      </div>

                      <h3 className="text-lg mb-2 text-[#1F2937] font-semibold">
                        {service.name}
                      </h3>

                      <p className="text-[#6B7280] text-sm">
                        {service.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-r from-[#2563EB] to-[#10B981] rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl mb-4">Besoin d'un de nos services ?</h2>

          <p className="text-white/90 mb-6">
            Notre équipe médicale est disponible pour vous accompagner. La
            consultation générale est accessible 24h/24 et 7j/7.
          </p>

          <div className="flex flex-wrap gap-4 justify-center" >
            
            <button className="bg-white text-[#2563EB] px-8 py-3 rounded-xl hover:bg-gray-100 transition-colors">
              Prendre Rendez-vous
            </button>

            <button className="bg-[#10B981] text-white px-8 py-3 rounded-xl hover:bg-[#059669] transition-colors">
              Nous Contacter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
