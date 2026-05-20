import { useState } from "react";
import {
  MapPin,
  Navigation,
  Phone,
  Clock,
  ParkingCircle,
  Accessibility,
  Locate,
  ExternalLink,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

// ─── Destination officielle ───────────────────────────────────────────────────
// Plus Code vérifié : 652G+JQG — Église Catholique Notre Dame De Fatima, Avedji
const DESTINATION_QUERY =
  "652G+JQG Eglise Catholique Notre Dame De Fatima Avedji, Lomé";

const CENTRE = {
  lat: 6.135333,
  lng: 1.222722,
  nom: "Centre Médico-Social Notre Dame de Fatima",
  adresse: "Avedji, Lomé, Togo",
  plusCode: "652G+JQG",
};

// ─── Itinéraire depuis position actuelle ──────────────────────────────────────
function ouvrirItineraire(originLat: number, originLng: number) {
  const url =
    `https://www.google.com/maps/dir/?api=1` +
    `&origin=${originLat},${originLng}` +
    `&destination=${encodeURIComponent(DESTINATION_QUERY)}` +
    `&travelmode=driving`;
  window.open(url, "_blank", "noopener,noreferrer");
}

// ─── Voir le centre seul sur Google Maps ─────────────────────────────────────
function ouvrirDestination() {
  const url =
    `https://www.google.com/maps/search/?api=1` +
    `&query=${encodeURIComponent(DESTINATION_QUERY)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

// ─── Bouton GPS ───────────────────────────────────────────────────────────────
function BoutonNavigation() {
  type Etat = "idle" | "loading" | "success" | "error";
  const [etat, setEtat] = useState<Etat>("idle");
  const [erreur, setErreur] = useState("");
  const [precision, setPrecision] = useState<number | null>(null);

  const localiser = () => {
    if (!navigator.geolocation) {
      setErreur("Votre navigateur ne supporte pas la géolocalisation.");
      setEtat("error");
      return;
    }

    setEtat("loading");
    setErreur("");
    setPrecision(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        setPrecision(Math.round(accuracy));
        setEtat("success");
        ouvrirItineraire(latitude, longitude);
      },
      (err) => {
        setEtat("error");
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setErreur(
              "Accès refusé. Autorisez la localisation dans les paramètres de votre navigateur, puis réessayez.",
            );
            break;
          case err.POSITION_UNAVAILABLE:
            setErreur(
              "Position GPS introuvable. Activez le GPS de votre appareil et réessayez en extérieur.",
            );
            break;
          case err.TIMEOUT:
            setErreur(
              "Délai dépassé. Placez-vous dans un endroit dégagé et réessayez.",
            );
            break;
          default:
            setErreur("Erreur de géolocalisation. Réessayez.");
        }
      },
      {
        enableHighAccuracy: true, // Force le GPS natif, pas le Wi-Fi
        timeout: 20000,
        maximumAge: 0, // Jamais de cache — position en temps réel
      },
    );
  };

  return (
    <div className="space-y-3">
      {/* Bouton principal */}
      <button
        onClick={localiser}
        disabled={etat === "loading"}
        className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl text-white font-medium text-base transition-all ${
          etat === "loading"
            ? "bg-[#2563EB]/70 cursor-not-allowed"
            : "bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-[0.98]"
        }`}
      >
        {etat === "loading" ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Recherche de votre position GPS…
          </>
        ) : (
          <>
            <Locate className="w-5 h-5" />
            M'y conduire — itinéraire depuis ma position
          </>
        )}
      </button>

      {/* Succès */}
      {etat === "success" && precision !== null && (
        <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-2.5">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          Position trouvée (±{precision} m). Google Maps ouvert dans un nouvel
          onglet.
        </div>
      )}

      {/* Erreur */}
      {etat === "error" && erreur && (
        <div className="flex items-start gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{erreur}</span>
        </div>
      )}

      {/* Fallback sans GPS */}
      <button
        onClick={ouvrirDestination}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-[#E5E7EB] text-[#6B7280] text-sm hover:bg-[#F9FAFB] transition-colors"
      >
        <ExternalLink className="w-4 h-4" />
        Voir le centre sur Google Maps
      </button>
    </div>
  );
}

// ─── Page principale ──────────────────────────────────────────────────────────
export function LocationPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl text-[#1F2937] mb-4">Notre Localisation</h1>
          <p className="text-lg text-[#6B7280]">
            Trouvez-nous facilement et planifiez votre visite
          </p>
          <p className="text-sm text-[#9CA3AF] mt-1">
            {CENTRE.plusCode} — Église Catholique Notre Dame De Fatima, Avedji,
            Lomé
          </p>
        </div>

        {/* ── Carte Google Maps intégrée — zoom 19 ─────────────────────────── */}
        <div className="rounded-2xl overflow-hidden mb-12 shadow-lg border border-[#E5E7EB]">
          <iframe
            title="Localisation Centre Médico-Social Notre Dame de Fatima"
            width="100%"
            height="420"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://maps.google.com/maps?q=${CENTRE.lat},${CENTRE.lng}&z=19&output=embed`}
            className="block"
          />
        </div>

        {/* ── Bouton itinéraire GPS ─────────────────────────────────────────── */}
        <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-2xl p-6 mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#2563EB] rounded-xl flex items-center justify-center shrink-0">
              <Navigation className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-[#1F2937]">
                Itinéraire depuis votre position actuelle
              </h2>
              <p className="text-sm text-[#6B7280]">
                Destination : {CENTRE.plusCode} — Église Notre Dame de Fatima,
                Avedji
              </p>
            </div>
          </div>
          <BoutonNavigation />
        </div>

        {/* ── Infos pratiques ───────────────────────────────────────────────── */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Adresse — cliquable */}
          <button
            onClick={ouvrirDestination}
            className="text-left bg-white border-2 border-[#E5E7EB] rounded-2xl p-6 hover:border-[#2563EB] transition-colors group"
          >
            <div className="w-14 h-14 bg-[#2563EB] rounded-xl flex items-center justify-center mb-4">
              <MapPin className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl mb-3 text-[#1F2937]">Adresse</h3>
            <p className="text-[#6B7280] leading-relaxed text-sm">
              Centre Médico-Social
              <br />
              Notre Dame de Fatima
              <br />
              Avedji, Lomé, Togo
              <br />
              <span className="text-xs text-[#9CA3AF] mt-1 block">
                Plus Code : {CENTRE.plusCode}
              </span>
            </p>
            <span className="inline-flex items-center gap-1 text-xs text-[#2563EB] mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <ExternalLink className="w-3 h-3" /> Voir sur Google Maps
            </span>
          </button>

          {/* Contact */}
          <div className="bg-white border-2 border-[#E5E7EB] rounded-2xl p-6 hover:border-[#10B981] transition-colors">
            <div className="w-14 h-14 bg-[#10B981] rounded-xl flex items-center justify-center mb-4">
              <Phone className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl mb-3 text-[#1F2937]">Contact</h3>
            <div className="space-y-2 text-[#6B7280]">
              <a
                href="tel:+22870842222"
                className="flex items-center gap-2 hover:text-[#10B981] transition-colors text-sm"
              >
                <Phone className="w-4 h-4 shrink-0" /> +228 70 84 22 22
              </a>
              <a
                href="tel:+22879790479"
                className="flex items-center gap-2 hover:text-[#10B981] transition-colors text-sm"
              >
                <Phone className="w-4 h-4 shrink-0" /> +228 79 79 04 79
              </a>
              <a
                href="mailto:cms.notredamefatima@gmail.com"
                className="block text-sm hover:text-[#10B981] transition-colors break-all"
              >
                cms.notredamefatima@gmail.com
              </a>
            </div>
          </div>

          {/* Horaires */}
          <div className="bg-white border-2 border-[#E5E7EB] rounded-2xl p-6 hover:border-[#F97316] transition-colors">
            <div className="w-14 h-14 bg-[#F97316] rounded-xl flex items-center justify-center mb-4">
              <Clock className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl mb-3 text-[#1F2937]">Horaires</h3>
            <div className="text-[#6B7280] text-sm">
              <div className="flex justify-between">
                <span>Lundi — Dimanche</span>
                <span className="font-medium text-[#1F2937]">
                  24h/24 · 7j/7
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Comment nous trouver ──────────────────────────────────────────── */}
        <div className="bg-[#F9FAFB] rounded-2xl p-8 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <Navigation className="w-8 h-8 text-[#2563EB] shrink-0 mt-1" />
            <h2 className="text-2xl text-[#1F2937]">Comment nous trouver</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 text-[#6B7280]">
            <div>
              <h3 className="text-base font-medium text-[#1F2937] mb-2">
                En voiture
              </h3>
              <p className="text-sm leading-relaxed">
                Depuis le centre-ville de Lomé, prendre la direction d'Avédji.
                Le centre est situé à proximité du marché d'Avédji et de
                l'église Notre Dame de Fatima. Parking disponible sur place.
              </p>
            </div>
            <div>
              <h3 className="text-base font-medium text-[#1F2937] mb-2">
                En transport commun
              </h3>
              <p className="text-sm leading-relaxed">
                Plusieurs lignes de bus et de taxis desservent le quartier.
                L'arrêt le plus proche est « Avédji ».
              </p>
            </div>
            <div>
              <h3 className="text-base font-medium text-[#1F2937] mb-2">
                Points de repère
              </h3>
              <ul className="text-sm space-y-1.5">
                <li className="flex gap-2">
                  <span className="shrink-0">•</span>Dans l'enceinte de l'église Catholique  Notre
                  Dame de Fatima d' Avédji
                </li>
                <li className="flex gap-2">
                  <span className="shrink-0">•</span>
                  Proche du carrefour de Limousine 
                </li>
                <li className="flex gap-2">
                  <span className="shrink-0">•</span>
                  Non loin de l'Institut d'éducation le Brio
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ── Parking & Accessibilité ───────────────────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border-2 border-[#E5E7EB] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <ParkingCircle className="w-6 h-6 text-[#2563EB]" />
              <h3 className="text-xl text-[#1F2937]">Parking</h3>
            </div>
            <p className="text-[#6B7280] text-sm leading-relaxed">
              Parking gratuit disponible pour nos patients.
            </p>
          </div>
          <div className="bg-white border-2 border-[#E5E7EB] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <Accessibility className="w-6 h-6 text-[#10B981]" />
              <h3 className="text-xl text-[#1F2937]">Accessibilité</h3>
            </div>
            <p className="text-[#6B7280] text-sm leading-relaxed">
              Établissement accessible aux personnes à mobilité réduite.
              
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
