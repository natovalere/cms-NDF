import {
  Award,
  Heart,
  Target,
  Handshake,
  Lightbulb,
  UserRound,
  Church,
  Users,
  Award as AwardIcon,
} from "lucide-react";

export function AboutPage() {
  /* =========================
     VALEURS
  ========================= */
  const values = [
    {
      title: "Compassion",
      icon: Heart,
      description: "Empathie et bienveillance envers chaque patient",
    },
    {
      title: "Excellence",
      icon: Award,
      description: "Qualité supérieure dans tous nos services",
    },
    {
      title: "Intégrité",
      icon: Handshake,
      description: "Honnêteté et transparence dans nos pratiques",
    },
    {
      title: "Innovation",
      icon: Lightbulb,
      description: "Technologies médicales de pointe",
    },
  ];

  /* =========================
     HISTORIQUE
  ========================= */
  const jalons = [
    {
      annee: "2013",
      label: "Fondation",
      texte:
        "Inauguration du Centre Médico-Social Notre Dame de Fatima le 26 janvier 2013.",
      icon: Church,
      couleur: "from-blue-500 to-blue-600",
    },
    {
      annee: "2013",
      label: "Ouverture",
      texte: "Ouverture officielle des portes au public le 11 février 2013.",
      icon: Users,
      couleur: "from-green-500 to-green-600",
    },
    {
      annee: "2018",
      label: "Gestion NDE",
      texte:
        "La gestion du centre est confiée aux Sœurs de Notre Dame de l'Église.",
      icon: AwardIcon,
      couleur: "from-emerald-500 to-emerald-600",
    },
  ];

  /* =========================
     ADMINISTRATION
  ========================= */
  const adminStructure = [
    {
      name: "Dr. FIAWOO",
      title: "Directeur Général",
      description:
        "Supervision globale et prise de décisions stratégiques.",
      icon: UserRound,

      subUnits: [
        {
          name: "Mr ADOKOU Jobin",
          title:
            "Chargé des Assurances, Maintenances et Infrastructures",
          description:
            "Gestion de la sécurité, des infrastructures et des contrats d’assurance.",
        },

        {
          name: "Mme AKPABLI Nicole",
          title: "Secrétaire",
          description:
            "Coordination administrative et accueil.",
        },

        {
          name: "Mr SIAKOU Dieu-donné",
          title: "Comptable",
          description:
            "Gestion des comptes, facturation et budget.",
        },

        {
          name: "Mr BUCKNOR David",
          title: "Chargé des Activités Pharmaceutiques",
          description:
            "Gestion des stocks et dispensation des médicaments.",
        },
      ],
    },
  ];

  return (
    <div className="bg-white text-[#1F2937]">

      {/* ======================================================
          HERO / HEADER
      ====================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0B1220] via-[#10213F] to-[#0B1220] py-24 px-4">

        {/* Effets décoratifs */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto text-center">

          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 backdrop-blur-sm rounded-full px-5 py-2 mb-6">
            <Church className="w-5 h-5 text-[#10B981]" />
            <span className="text-white text-sm tracking-wide">
              Centre Médico-Social
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
            Notre Dame de Fatima
          </h1>

          <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
            Au service de la santé et du bien-être de la communauté
            depuis 2013 avec professionnalisme, compassion et excellence.
          </p>

        </div>
      </section>

      {/* ======================================================
          HISTORIQUE
      ====================================================== */}
      <section className="py-20 px-4 bg-[#F9FAFB]">

        <div className="max-w-7xl mx-auto">

          {/* Titre */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#DBEAFE] mb-5">
              <Church className="w-8 h-8 text-[#2563EB]" />
            </div>

            <h2 className="text-4xl font-bold mb-4">
              Notre Histoire
            </h2>

            <p className="text-[#6B7280] max-w-2xl mx-auto">
              Une œuvre paroissiale dédiée à la santé et au service humain.
            </p>
          </div>

          {/* Texte historique */}
          <div className="bg-white rounded-3xl border border-[#E5E7EB] p-8 md:p-12 shadow-sm mb-16">

            <p className="text-[#4B5563] text-lg leading-9 text-center max-w-5xl mx-auto">
              Le Centre Médico-Social Notre Dame de Fatima d’Avédji est une
              œuvre paroissiale initiée par le Révérend Père Curé Paul Sèvi
              MESSAN. Inauguré le 26 janvier 2013 par Son
              Excellence Monseigneur Denis K. AMOUZOU-DZAKPA,
              archevêque d’alors de l’archidiocèse de Lomé, le Centre a
              ouvert ses portes le 11 février 2013. En 2018, la gestion
              du centre a été confiée aux Sœurs de Notre Dame de l’Église
              (NDE). Son actuel président du conseil d’administration est
              le Révérend Père Curé André LOGOSSOU.
            </p>

          </div>

          

        </div>
      </section>

      {/* ======================================================
          MISSION & VISION
      ====================================================== */}
      <section className="py-20 px-4">

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">

          {/* Mission */}
          <div className="bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] rounded-3xl p-10 text-white shadow-lg">

            <Target className="w-14 h-14 mb-6" />

            <h2 className="text-3xl font-bold mb-5">
              Notre Mission
            </h2>

            <p className="text-white/90 leading-8">
              Fournir des soins médicaux de qualité supérieure,
              accessibles à tous, dans un environnement chaleureux
              et respectueux de la dignité humaine.
            </p>

          </div>

          {/* Vision */}
          <div className="bg-gradient-to-br from-[#10B981] to-[#059669] rounded-3xl p-10 text-white shadow-lg">

            <Heart className="w-14 h-14 mb-6" />

            <h2 className="text-3xl font-bold mb-5">
              Notre Vision
            </h2>

            <p className="text-white/90 leading-8">
              Être le centre médical de référence reconnu pour
              l’excellence de ses soins, l’innovation et son
              engagement envers la communauté.
            </p>

          </div>

        </div>
      </section>

      {/* ======================================================
          VALEURS
      ====================================================== */}
      <section className="py-20 px-4 bg-[#F9FAFB]">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4">
              Nos Valeurs
            </h2>

            <p className="text-[#6B7280]">
              Les principes qui guident chacune de nos actions.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">

            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <div
                  key={index}
                  className="bg-white border border-[#E5E7EB] rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300"
                >

                  <div className="w-16 h-16 bg-[#EFF6FF] rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <Icon className="w-8 h-8 text-[#2563EB]" />
                  </div>

                  <h3 className="text-xl font-bold mb-3">
                    {value.title}
                  </h3>

                  <p className="text-[#6B7280] leading-relaxed">
                    {value.description}
                  </p>

                </div>
              );
            })}

          </div>

        </div>
      </section>

      {/* ======================================================
          STATISTIQUES
      ====================================================== */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#2563EB] to-[#1D4ED8]">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-white mb-4">
              Notre Impact
            </h2>

            <p className="text-white/80">
              Quelques chiffres représentatifs du centre.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">

            {[
              {
                number: "14+",
                label: "Années d'Expérience",
              },

              {
                number: "11+",
                label: "Professionnels de Santé",
              },

              {
                number: "10 000+",
                label: "Patients Satisfaits",
              },

              {
                number: "24/7",
                label: "Service d'Urgence",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/10"
              >

                <div className="text-5xl font-bold text-white mb-3">
                  {stat.number}
                </div>

                <div className="text-white/80">
                  {stat.label}
                </div>

              </div>
            ))}

          </div>

        </div>
      </section>

      {/* ======================================================
          ADMINISTRATION
      ====================================================== */}
      <section className="py-20 px-4">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4">
              Administration du Centre
            </h2>

            <p className="text-[#6B7280]">
              Une équipe engagée pour le bon fonctionnement du centre.
            </p>
          </div>

          {adminStructure.map((unit, index) => (
            <div key={index}>

              {/* DG */}
              <div className="bg-gradient-to-br from-white to-[#F9FAFB] border-2 border-[#2563EB] rounded-3xl p-10 text-center mb-10 shadow-sm">

                <div className="w-28 h-28 bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <unit.icon className="w-14 h-14 text-white" />
                </div>

                <h3 className="text-3xl font-bold mb-2">
                  {unit.name}
                </h3>

                <p className="text-[#2563EB] text-xl font-semibold mb-4">
                  {unit.title}
                </p>

                <p className="text-[#6B7280] text-lg">
                  {unit.description}
                </p>

              </div>

              {/* Sous unités */}
              <div className="grid md:grid-cols-4 gap-6">

                {unit.subUnits.map((sub, subIndex) => (
                  <div
                    key={subIndex}
                    className="bg-white border border-[#E5E7EB] rounded-2xl p-6 text-center hover:border-[#2563EB] hover:shadow-lg transition-all duration-300"
                  >

                    <div className="w-20 h-20 bg-[#EFF6FF] rounded-full flex items-center justify-center mx-auto mb-5">
                      <unit.icon className="w-10 h-10 text-[#2563EB]" />
                    </div>

                    <h4 className="text-lg font-bold mb-2">
                      {sub.name}
                    </h4>

                    <p className="text-[#2563EB] font-semibold mb-3">
                      {sub.title}
                    </p>

                    <p className="text-sm text-[#6B7280] leading-relaxed">
                      {sub.description}
                    </p>

                  </div>
                ))}

              </div>

            </div>
          ))}

        </div>
      </section>

    </div>
  );
}