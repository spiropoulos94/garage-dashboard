import "server-only";
import { SidebarStrings } from "./SidebarStrings";
import { BookingsStrings } from "./BookingsStrings";
import { GeneralStrings } from "./GeneralStrings";
import { AuthStrings } from "./AuthStrings";

export type DictionaryRoot = {
  sidebar: SidebarStrings;
  bookings: BookingsStrings;
  general: GeneralStrings;
  auth: AuthStrings;
};

interface Dictionary {
  [locale: string]: () => Promise<DictionaryRoot>;
}
const dictionaries: Dictionary = {
  en_US: () => import("./en_US.json").then((module) => module.default),
  de_DE: () => import("./de_DE.json").then((module) => module.default),
};

export async function getDictionary(locale: string): Promise<DictionaryRoot> {
  if (!locale) throw new Error("Locale is required");
  if (!(locale in dictionaries)) {
    throw new Error(`Unsupported locale: ${locale}`);
  }
  return (await dictionaries[locale]()) as DictionaryRoot;
}
