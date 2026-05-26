const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as
  | string
  | undefined;
const STORAGE_SUPABASE_ACCESS_TOKEN = "supabase_access_token";

export const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey);

export function getSupabaseRestBaseUrl() {
  if (!supabaseUrl) return "";
  return `${supabaseUrl.replace(/\/$/, "")}/rest/v1`;
}

export function getSupabaseHeaders(extra?: Record<string, string>) {
  const accessToken = getSupabaseAccessToken();
  return {
    apikey: supabaseAnonKey ?? "",
    Authorization: `Bearer ${accessToken ?? supabaseAnonKey ?? ""}`,
    "Content-Type": "application/json",
    ...(extra ?? {}),
  };
}

export function getSupabaseAnonHeaders(extra?: Record<string, string>) {
  return {
    apikey: supabaseAnonKey ?? "",
    Authorization: `Bearer ${supabaseAnonKey ?? ""}`,
    "Content-Type": "application/json",
    ...(extra ?? {}),
  };
}

export function getSupabaseAccessToken(): string | null {
  return localStorage.getItem(STORAGE_SUPABASE_ACCESS_TOKEN);
}

export function setSupabaseAccessToken(token: string): void {
  localStorage.setItem(STORAGE_SUPABASE_ACCESS_TOKEN, token);
}

export function clearSupabaseAccessToken(): void {
  localStorage.removeItem(STORAGE_SUPABASE_ACCESS_TOKEN);
}

export interface SupabaseSignInResult {
  ok: boolean;
  error?: string;
}

export async function signInSupabase(
  email: string,
  password: string,
): Promise<SupabaseSignInResult> {
  if (!hasSupabaseConfig || !supabaseUrl || !supabaseAnonKey) {
    return { ok: false, error: "Configuration Supabase manquante (.env)." };
  }

  const response = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: {
      apikey: supabaseAnonKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    let reason = "Échec de connexion Supabase.";
    try {
      const data = (await response.json()) as {
        msg?: string;
        error_description?: string;
        error?: string;
      };
      reason = data.msg ?? data.error_description ?? data.error ?? reason;
    } catch {
      // Ignore parse error and keep generic reason.
    }
    return { ok: false, error: reason };
  }

  const data = (await response.json()) as { access_token?: string };
  if (!data.access_token) {
    return { ok: false, error: "Token d'accès Supabase introuvable." };
  }

  setSupabaseAccessToken(data.access_token);
  return { ok: true };
}
