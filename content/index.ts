import { profileEs } from "./profile.es";
import type { Locale, Profile } from "./types";

export const LOCALES: Locale[] = ["es"];
export const DEFAULT_LOCALE: Locale = "es";

const profiles: Record<Locale, Profile> = {
  es: profileEs,
  en: profileEs,
};

export function getProfile(locale: Locale = DEFAULT_LOCALE): Profile {
  return profiles[locale];
}

export type { Locale, Profile } from "./types";
