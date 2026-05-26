export interface ActionTrace {
  par: string;
  role: string;
  action: string;
  date: string;
}

export interface Appointment {
  id: number;
  patient: string;
  service: string;
  time: string;
  date?: string;
  message?: string;
  email?: string;
  phone?: string;
  status: "confirmed" | "waiting" | "pending";
  trace?: ActionTrace;
}

const STORAGE_KEY = "appointments";

function normalizeAppointment(item: unknown): Appointment | null {
  if (!item || typeof item !== "object") return null;
  const apt = item as Partial<Appointment>;
  if (typeof apt.id !== "number") return null;
  if (typeof apt.patient !== "string") return null;
  if (typeof apt.service !== "string") return null;

  const status =
    apt.status === "confirmed" || apt.status === "waiting" || apt.status === "pending"
      ? apt.status
      : "pending";

  return {
    id: apt.id,
    patient: apt.patient,
    service: apt.service,
    time: typeof apt.time === "string" ? apt.time : "À confirmer",
    date: typeof apt.date === "string" ? apt.date : "",
    message: typeof apt.message === "string" ? apt.message : "",
    email: typeof apt.email === "string" ? apt.email : "",
    phone: typeof apt.phone === "string" ? apt.phone : "",
    status,
    trace: apt.trace,
  };
}

export function getAppointments(): Appointment[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((item) => normalizeAppointment(item))
      .filter((item): item is Appointment => item !== null);
  } catch {
    return [];
  }
}

export function saveAppointments(appointments: Appointment[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
}
