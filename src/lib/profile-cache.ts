import type { TasteProfile } from '@/types/book';

const KEY = 'btp:taste-profile';
const DAYS = 30;

type StoredProfile = TasteProfile & {
  fingerprint: string;
  cachedAt: string;
};

export function saveProfile(data: TasteProfile, fingerprint: string): void {
  const stored: StoredProfile = {
    ...data,
    fingerprint,
    cachedAt: new Date().toISOString(),
  };
  localStorage.setItem(KEY, JSON.stringify(stored));
}

export function loadTasteProfile(fingerprint: string): TasteProfile | null {
  const serialized = localStorage.getItem(KEY);
  if (!serialized) return null;
  try {
    const stored: StoredProfile = JSON.parse(serialized);
    if (stored.fingerprint !== fingerprint) return null;
    const age = Date.now() - new Date(stored.cachedAt).getTime();
    if (age > DAYS * 24 * 60 * 60 * 1000) return null;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { fingerprint: _fp, cachedAt: _ca, ...profile } = stored;
    return profile;
  } catch {
    return null;
  }
}

export const clearLocalTasteProfile = (): void => {
  localStorage.removeItem(KEY);
};
