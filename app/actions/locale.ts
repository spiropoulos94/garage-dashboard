"use server";

import { getFromSession, saveToSession } from "@/app/helpers/sessionHelpers";

export const updateLocale = async (locale: string) => {
  saveToSession("locale", locale);
};

export const getLocale = async (): Promise<string> => {
  const locale = getFromSession("locale");

  return locale;
};
