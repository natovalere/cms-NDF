import { clearSupabaseAccessToken, signInSupabase } from "@/app/lib/supabaseRest";

export interface AdminAccount {
  id: string;
  prenom: string;
  nom: string;
  role: string;
  email: string;
  password: string;
  avatar: string;
}

export type AdminUser = Omit<AdminAccount, "password">;

export const ADMINS: AdminAccount[] = [
  {
    id: "admin-1",
    prenom: "Nicole",
    nom: "AKPABLI",
    role: "secrétaire",
    email: "secre@fatima.tg",
    password: "Fatima@2026",
    avatar: "AN",
  },
  {
    id: "admin-2",
    prenom: "Dr. FIAWOO",
    nom: "",
    role: "DG",
    email: "DG@fatima.tg",
    password: "F@tima@2026",
    avatar: "F",
  },
];

const STORAGE_ADMIN_CONNECTED = "admin";
const STORAGE_ADMIN_USER = "admin_user";

export function nomComplet(
  admin: Pick<AdminAccount, "prenom" | "nom">,
): string {
  return `${admin.prenom} ${admin.nom}`.trim();
}

export async function connecterAdmin(
  email: string,
  motDePasse: string,
): Promise<AdminAccount | null> {
  const emailNormalise = email.trim().toLowerCase();
  const mdpNormalise = motDePasse.trim();

  const admin = ADMINS.find(
    (item) =>
      item.email.toLowerCase() === emailNormalise &&
      item.password === mdpNormalise,
  );

  if (!admin) {
    return null;
  }

  const signedIn = await signInSupabase(admin.email, mdpNormalise);
  if (!signedIn) {
    return null;
  }

  const { password: _password, ...adminUser } = admin;
  localStorage.setItem(STORAGE_ADMIN_CONNECTED, "true");
  localStorage.setItem(STORAGE_ADMIN_USER, JSON.stringify(adminUser));
  return admin;
}

export function getAdminConnecte(): AdminUser | null {
  const isConnected = localStorage.getItem(STORAGE_ADMIN_CONNECTED) === "true";
  if (!isConnected) return null;

  const raw = localStorage.getItem(STORAGE_ADMIN_USER);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as AdminUser;
    if (!parsed?.email) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function deconnecterAdmin(): void {
  localStorage.removeItem(STORAGE_ADMIN_CONNECTED);
  localStorage.removeItem(STORAGE_ADMIN_USER);
  clearSupabaseAccessToken();
}
