import {
  hasSupabaseConfig,
  getSupabaseAnonHeaders,
  getSupabaseHeaders,
  getSupabaseRestBaseUrl,
} from "@/app/lib/supabaseRest";
import type { ActionTrace, Appointment } from "@/app/lib/appointmentsStorage";

type AppointmentStatus = Appointment["status"];

interface AppointmentRow {
  id: number | string;
  patient: string;
  service: string;
  time: string;
  date: string | null;
  message: string | null;
  email: string | null;
  phone: string | null;
  status: AppointmentStatus;
  trace: ActionTrace | null;
  created_at: string;
}

function mapRowToAppointment(row: AppointmentRow): Appointment {
  const id =
    typeof row.id === "number" ? row.id : Number.parseInt(row.id, 10) || Date.now();

  return {
    id,
    patient: row.patient,
    service: row.service,
    time: row.time,
    date: row.date ?? "",
    message: row.message ?? "",
    email: row.email ?? "",
    phone: row.phone ?? "",
    status: row.status,
    trace: row.trace ?? undefined,
  };
}

function ensureSupabaseConfig() {
  if (!hasSupabaseConfig) {
    throw new Error(
      "Configuration Supabase manquante. Vérifiez VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY dans .env.",
    );
  }
}

export async function listAppointments(): Promise<Appointment[]> {
  ensureSupabaseConfig();

  const query =
    "id,patient,service,time,date,message,email,phone,status,trace,created_at";
  const response = await fetch(
    `${getSupabaseRestBaseUrl()}/appointments?select=${query}&order=date.asc.nullslast,created_at.asc`,
    { headers: getSupabaseHeaders() },
  );

  if (!response.ok) throw new Error(await response.text());

  const data = (await response.json()) as AppointmentRow[];
  return data.map(mapRowToAppointment);
}

export async function createAppointment(
  payload: Omit<Appointment, "id" | "status" | "time"> & {
    time?: string;
    status?: AppointmentStatus;
  },
): Promise<Appointment> {
  ensureSupabaseConfig();

  const newAppointment: Appointment = {
    id: Date.now(),
    patient: payload.patient,
    phone: payload.phone ?? "",
    email: payload.email ?? "",
    service: payload.service,
    date: payload.date ?? "",
    message: payload.message ?? "",
    time: payload.time ?? "À confirmer",
    status: payload.status ?? "pending",
  };

  const response = await fetch(`${getSupabaseRestBaseUrl()}/appointments`, {
    method: "POST",
    headers: getSupabaseAnonHeaders({ Prefer: "return=representation" }),
    body: JSON.stringify({
      patient: newAppointment.patient,
      service: newAppointment.service,
      time: newAppointment.time,
      date: newAppointment.date || null,
      message: newAppointment.message || null,
      email: newAppointment.email || null,
      phone: newAppointment.phone || null,
      status: newAppointment.status,
    }),
  });

  if (!response.ok) throw new Error(await response.text());

  const rows = (await response.json()) as AppointmentRow[];
  if (!Array.isArray(rows) || rows.length === 0) {
    throw new Error("Réponse Supabase invalide après création de rendez-vous.");
  }

  return mapRowToAppointment(rows[0]);
}

export async function updateAppointmentStatus(
  id: number,
  status: AppointmentStatus,
  trace?: ActionTrace,
) {
  ensureSupabaseConfig();

  const response = await fetch(
    `${getSupabaseRestBaseUrl()}/appointments?id=eq.${id}`,
    {
      method: "PATCH",
      headers: getSupabaseHeaders(),
      body: JSON.stringify({ status, trace: trace ?? null }),
    },
  );

  if (!response.ok) throw new Error(await response.text());
}

export async function deleteAppointment(id: number) {
  ensureSupabaseConfig();

  const response = await fetch(
    `${getSupabaseRestBaseUrl()}/appointments?id=eq.${id}`,
    {
      method: "DELETE",
      headers: getSupabaseHeaders(),
    },
  );

  if (!response.ok) throw new Error(await response.text());
}
