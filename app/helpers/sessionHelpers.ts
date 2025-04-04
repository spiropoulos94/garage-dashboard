import { cookies } from "next/headers";

export const ONE_DAY = 24 * 60 * 60 * 1000;

export function saveToClientCookies(key: string, value: string, expiresIn: number = 0): void {
  const oneDay = 24 * 60 * 60 * 1000;
  const maxAge = expiresIn > 0 ? expiresIn : oneDay;
  cookies().set(key, value, { httpOnly: false, secure: false, maxAge: maxAge });
}

export function getTokenFromSession(): string {
  return cookies().get("token")?.value || "";
}

export function getUserIdFromSession(): string {
  return cookies().get("userId")?.value || "";
}

export function getLocaleFromSession(): string {
  return cookies().get("locale")?.value || "en";
}

export function getFromSession(key: string): string {
  return cookies().get(key)?.value || "";
}

// Check if we're in mock mode
export const isInMockMode = (): boolean => {
  const token = getTokenFromSession();
  return token === "FAKE_TOKEN";
};

// Function to validate session, including mock mode support
export const validateSession = (): boolean => {
  const userId = cookies().get("userId")?.value;
  const accessToken = cookies().get("token")?.value;

  // Mock mode is considered a valid session
  if (accessToken === "FAKE_TOKEN") {
    return true;
  }

  if (!userId || !accessToken) {
    return false;
  }
  return true;
};

export async function saveToSession(
  key: string,
  value: string,
  expiresIn: number = 0,
): Promise<void> {
  const maxAge = expiresIn > 0 ? expiresIn : undefined; // Undefined for no expiration

  cookies().set(key, value, { httpOnly: true, secure: true, maxAge: maxAge });
}
