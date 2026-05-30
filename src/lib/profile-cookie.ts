import type { TasteProfileResponse } from '@/types/book';

const KEY = 'btp:taste-profile';
const DAYS = 30;

type StoredProfile = TasteProfileResponse & { fingerprint: string };

export function saveProfile(data: TasteProfileResponse, fingerprint: string): void {
  const stored: StoredProfile = { ...data, fingerprint };
  const expires = new Date();
  expires.setDate(expires.getDate() + DAYS);
  document.cookie = `${KEY}=${encodeURIComponent(JSON.stringify(stored))}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
}

export function loadProfile(fingerprint: string): TasteProfileResponse | null {
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${KEY}=`));
  if (!match) return null;
  try {
    const stored: StoredProfile = JSON.parse(decodeURIComponent(match.slice(KEY.length + 1)));
    if (stored.fingerprint !== fingerprint) return null;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { fingerprint: _fp, ...profile } = stored;
    return profile;
  } catch {
    return null;
  }
}

export function clearProfile(): void {
  document.cookie = `${KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}
