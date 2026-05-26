import { useState, useEffect } from "react";
import {
  Calendar,
  Bell,
  LogOut,
  Home,
  CheckCircle,
  Clock,
  Phone,
  Mail,
  Trash2,
  AlertCircle,
  User,
  ShieldCheck,
} from "lucide-react";
import {
  getAdminConnecte,
  deconnecterAdmin,
  nomComplet,
  type AdminUser,
} from "@/medical/admins";
import {
  deleteAppointment,
  listAppointments,
  updateAppointmentStatus,
} from "@/app/lib/appointmentsService";
import type { ActionTrace, Appointment } from "@/app/lib/appointmentsStorage";

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    confirmed: { label: "Confirmé", cls: "bg-green-100 text-green-700" },
    waiting: { label: "En attente", cls: "bg-sky-100 text-sky-700" },
    pending: { label: "Non traité", cls: "bg-indigo-100 text-indigo-700" },
  };
  const s = map[status] ?? { label: status, cls: "bg-gray-100 text-gray-600" };
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${s.cls}`}>
      {s.label}
    </span>
  );
}

function dateHeure(): string {
  return new Date().toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function creerTrace(admin: AdminUser, action: string): ActionTrace {
  return {
    par: nomComplet(admin),
    role: admin.role,
    action,
    date: dateHeure(),
  };
}

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const [adminConnecte, setAdminConnecte] = useState<AdminUser | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  const afficherToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    const admin = getAdminConnecte();
    if (!admin) {
      onNavigate("home");
      return;
    }
    setAdminConnecte(admin);
  }, [onNavigate]);

  const chargerDonnees = async () => {
    try {
      const rows = await listAppointments();
      setAppointments(rows);
    } catch (error) {
      console.error(error);
      afficherToast("Impossible de charger les rendez-vous.");
    }
  };

  useEffect(() => {
    chargerDonnees();
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      chargerDonnees();
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const handleLogout = () => {
    if (
      !confirm(
        `Déconnecter ${adminConnecte ? nomComplet(adminConnecte) : "l'administrateur"} ?`,
      )
    )
      return;
    deconnecterAdmin();
    onNavigate("home");
  };

  if (!adminConnecte) return null;

  const confirmerRDV = async (id: number) => {
    const trace = creerTrace(adminConnecte, "Rendez-vous confirmé");
    try {
      await updateAppointmentStatus(id, "confirmed", trace);
      await chargerDonnees();
      afficherToast(`Confirmé par ${nomComplet(adminConnecte)}`);
    } catch (error) {
      console.error(error);
      afficherToast("Erreur lors de la confirmation.");
    }
  };

  const mettreEnAttente = async (id: number) => {
    const trace = creerTrace(adminConnecte, "Mis en attente");
    try {
      await updateAppointmentStatus(id, "waiting", trace);
      await chargerDonnees();
      afficherToast("Rendez-vous mis en attente.");
    } catch (error) {
      console.error(error);
      afficherToast("Erreur lors de la mise en attente.");
    }
  };

  const supprimerRDV = async (id: number) => {
    if (!confirm("Supprimer définitivement ce rendez-vous ?")) return;
    try {
      await deleteAppointment(id);
      await chargerDonnees();
      afficherToast("Rendez-vous supprimé.");
    } catch (error) {
      console.error(error);
      afficherToast("Erreur lors de la suppression.");
    }
  };

  const totalRDV = appointments.length;
  const confirmedRDV = appointments.filter(
    (a) => a.status === "confirmed",
  ).length;
  const waitingRDV = appointments.filter((a) => a.status === "waiting").length;
  const pendingRDV = appointments.filter((a) => a.status === "pending").length;

  const stats = [
    {
      label: "Total demandes",
      value: totalRDV,
      icon: Calendar,
      color: "bg-[#2563EB]",
    },
    {
      label: "Confirmés",
      value: confirmedRDV,
      icon: CheckCircle,
      color: "bg-[#10B981]",
    },
    {
      label: "En attente",
      value: waitingRDV,
      icon: Clock,
      color: "bg-[#0EA5E9]",
    },
    {
      label: "Non traités",
      value: pendingRDV,
      icon: AlertCircle,
      color: "bg-[#6366F1]",
    },
  ];

  const tabs = [
    { id: "overview", label: "Vue d'ensemble" },
    {
      id: "appointments",
      label: `Rendez-vous${pendingRDV > 0 ? ` (${pendingRDV})` : ""}`,
    },
    { id: "reports", label: "Rapports" },
  ];

  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-[#1F2937] text-white text-sm px-5 py-3 rounded-xl shadow-lg flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-400" />
          {toast}
        </div>
      )}

      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap gap-4 justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-[#1F2937]">
              Tableau de bord
            </h1>
            <p className="text-sm text-[#6B7280]">
              Centre Medico-social Notre Dame de Fatima
            </p>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <div className="w-7 h-7 bg-[#2563EB] rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
                {adminConnecte.avatar}
              </div>
              <span className="flex items-center gap-1 text-sm text-[#1F2937]">
                <User className="w-3.5 h-3.5 text-[#6B7280]" />
                {nomComplet(adminConnecte)}
              </span>
              <span className="flex items-center gap-1 text-xs px-2 py-0.5 bg-[#EFF6FF] text-[#2563EB] rounded-full">
                <ShieldCheck className="w-3 h-3" />
                {adminConnecte.role}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab("appointments")}
              className="relative p-2 hover:bg-[#F3F4F6] rounded-lg transition-colors"
              title="Rendez-vous non traités"
            >
              <Bell className="w-5 h-5 text-[#1F2937]" />
              {pendingRDV > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#2563EB] text-white text-xs min-w-[18px] h-[18px] flex items-center justify-center rounded-full">
                  {pendingRDV}
                </span>
              )}
            </button>

            <button
              onClick={() => onNavigate("home")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#2563EB] text-[#2563EB] text-sm hover:bg-[#2563EB] hover:text-white transition-colors"
            >
              <Home className="w-4 h-4" />
              Accueil
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#E5E7EB] text-[#6B7280] text-sm hover:bg-[#F3F4F6] transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-5 border border-[#E5E7EB]"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs text-[#6B7280] mb-1">{s.label}</p>
                  <p className="text-3xl font-semibold text-[#1F2937]">
                    {s.value}
                  </p>
                </div>
                <div
                  className={`w-10 h-10 ${s.color} rounded-lg flex items-center justify-center shrink-0`}
                >
                  <s.icon className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-[#E5E7EB]">
          <div className="border-b border-[#E5E7EB] px-6 overflow-x-auto">
            <div className="flex min-w-max">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-4 text-sm border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-[#2563EB] text-[#2563EB] font-medium"
                      : "border-transparent text-[#6B7280] hover:text-[#1F2937]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {activeTab === "overview" && (
              <div className="space-y-6">
                {pendingRDV > 0 && (
                  <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
                    <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <span>
                      Vous avez{" "}
                      <strong>{pendingRDV} rendez-vous non traités</strong> en
                      attente de traitement.
                    </span>
                  </div>
                )}

                <div className="rounded-xl border border-[#E5E7EB] overflow-hidden">
                  <div className="px-5 py-4 bg-[#F9FAFB] border-b border-[#E5E7EB]">
                    <h2 className="font-medium text-[#1F2937] flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-[#2563EB]" />
                      Résumé des rendez-vous
                    </h2>
                  </div>
                  <div className="divide-y divide-[#F3F4F6]">
                    {[
                      {
                        label: "Total des demandes",
                        value: totalRDV,
                        cls: "text-[#1F2937]",
                      },
                      {
                        label: "Confirmés",
                        value: confirmedRDV,
                        cls: "text-green-600",
                      },
                      {
                        label: "En attente",
                        value: waitingRDV,
                        cls: "text-sky-600",
                      },
                      {
                        label: "Non traités",
                        value: pendingRDV,
                        cls: "text-indigo-600",
                      },
                    ].map((r) => (
                      <div
                        key={r.label}
                        className="flex justify-between items-center px-5 py-3 text-sm"
                      >
                        <span className="text-[#6B7280]">{r.label}</span>
                        <span className={`font-semibold ${r.cls}`}>
                          {r.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {appointments.length > 0 && (
                  <div>
                    <h2 className="font-medium text-[#1F2937] mb-3 text-sm">
                      Dernières demandes reçues
                    </h2>
                    <div className="space-y-2">
                      {appointments.slice(0, 5).map((apt) => (
                        <div
                          key={apt.id}
                          className="flex items-center justify-between bg-[#F9FAFB] rounded-lg px-4 py-3 border border-[#E5E7EB]"
                        >
                          <div className="min-w-0">
                            <span className="text-sm font-medium text-[#1F2937]">
                              {apt.patient}
                            </span>
                            <span className="text-xs text-[#6B7280] ml-2">
                              {apt.service}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 shrink-0 ml-2">
                            <span className="text-xs text-[#9CA3AF]">
                              {apt.time}
                            </span>
                            <StatusBadge status={apt.status} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "appointments" && (
              <div className="space-y-3">
                {appointments.length === 0 && (
                  <p className="text-sm text-[#6B7280] py-10 text-center">
                    Aucun rendez-vous enregistré pour le moment.
                  </p>
                )}

                {appointments.map((apt) => (
                  <div
                    key={apt.id}
                    className={`rounded-xl border p-4 ${
                      apt.status === "confirmed"
                        ? "bg-green-50 border-green-200"
                        : apt.status === "waiting"
                          ? "bg-sky-50 border-sky-200"
                          : "bg-indigo-50 border-indigo-200"
                    }`}
                  >
                    <div className="flex flex-wrap gap-3 items-start justify-between">
                      <div className="space-y-1.5 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-medium text-[#1F2937]">
                            {apt.patient}
                          </p>
                          <StatusBadge status={apt.status} />
                        </div>
                        <p className="text-sm text-[#6B7280]">
                          {apt.service} - {apt.time}
                        </p>
                        {apt.phone && (
                          <a
                            href={`tel:${apt.phone}`}
                            className="text-sm flex items-center gap-1.5 text-[#2563EB] hover:underline"
                          >
                            <Phone className="w-3.5 h-3.5" /> {apt.phone}
                          </a>
                        )}
                        {apt.email && (
                          <a
                            href={`mailto:${apt.email}`}
                            className="text-sm flex items-center gap-1.5 text-[#10B981] hover:underline"
                          >
                            <Mail className="w-3.5 h-3.5" /> {apt.email}
                          </a>
                        )}
                        {apt.trace && (
                          <p className="text-xs text-[#9CA3AF] italic">
                            {apt.trace.action} par {apt.trace.par} (
                            {apt.trace.role}) - {apt.trace.date}
                          </p>
                        )}
                      </div>

                      {apt.status !== "confirmed" && (
                        <div className="flex flex-wrap gap-2 shrink-0">
                          <button
                            onClick={() => confirmerRDV(apt.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#10B981] text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                          >
                            <CheckCircle className="w-3.5 h-3.5" /> Confirmer
                          </button>
                          {apt.status !== "waiting" && (
                            <button
                              onClick={() => mettreEnAttente(apt.id)}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0EA5E9] text-white text-sm rounded-lg hover:bg-sky-600 transition-colors"
                            >
                              <Clock className="w-3.5 h-3.5" /> En attente
                            </button>
                          )}
                          <button
                            onClick={() => supprimerRDV(apt.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 text-slate-700 text-sm rounded-lg hover:bg-slate-50 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Supprimer
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "reports" && (
              <div className="space-y-4">
                <h2 className="font-medium text-[#1F2937] flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Rendez-vous confirmés ({confirmedRDV})
                </h2>
                {appointments.filter((a) => a.status === "confirmed").length ===
                0 ? (
                  <p className="text-sm text-[#6B7280] py-8 text-center">
                    Aucun rendez-vous confirmé pour le moment.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {appointments
                      .filter((a) => a.status === "confirmed")
                      .map((apt) => (
                        <div
                          key={apt.id}
                          className="bg-green-50 border border-green-200 rounded-lg px-4 py-3"
                        >
                          <div className="flex flex-wrap justify-between items-center gap-2 text-sm">
                            <span className="font-medium text-[#1F2937]">
                              {apt.patient}
                            </span>
                            <span className="text-[#6B7280]">
                              {apt.service}
                            </span>
                            <span className="text-[#6B7280]">{apt.time}</span>
                          </div>
                          {apt.phone && (
                            <a
                              href={`tel:${apt.phone}`}
                              className="text-xs flex items-center gap-1 text-[#2563EB] mt-1 hover:underline"
                            >
                              <Phone className="w-3 h-3" /> {apt.phone}
                            </a>
                          )}
                          {apt.trace && (
                            <p className="text-xs text-[#9CA3AF] mt-1 italic">
                              Traité par {apt.trace.par} ({apt.trace.role}) -{" "}
                              {apt.trace.date}
                            </p>
                          )}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
