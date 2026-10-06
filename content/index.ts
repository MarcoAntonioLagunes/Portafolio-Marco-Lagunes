import { profileEn } from "./profile.en";
import { profileEs } from "./profile.es";
import { DEFAULT_LOCALE } from "./locales";
import type { Locale, Profile } from "./types";

const profiles: Record<Locale, Profile> = {
  es: profileEs,
  en: profileEn,
};

export function getProfile(locale: Locale = DEFAULT_LOCALE): Profile {
  return profiles[locale];
}

export * from "./locales";
export type { Profile } from "./types";
