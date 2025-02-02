"use client";

import { ReactNode, createContext, useContext } from "react";
import { DictionaryRoot } from "../(pages)/[lang]/dictionaries/dictionaries";

export const DictionaryContext = createContext({});

export function useDictionaryContext() {
  return useContext(DictionaryContext) as DictionaryRoot;
}

export function DictionaryContextProvider({
  children,
  dictionary,
}: {
  children: ReactNode;
  dictionary: DictionaryRoot;
}) {
  return <DictionaryContext.Provider value={dictionary}>{children}</DictionaryContext.Provider>;
}
