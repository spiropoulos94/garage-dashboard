"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ModalMap } from "../containers/modals/base/ModalRenderer";
import { usePathname, useRouter } from "next/navigation";
import { log } from "console";
import { logOut } from "@/app/actions/auth";

export interface ModalContextData {
  modalState: ModalMap;
  openModal: (id: string, meta: any) => void;
  closeModal: (id: string) => void;
}

const initialState: ModalMap = {};

export const ModalContext = createContext<ModalContextData>({
  modalState: {},
  openModal: () => {},
  closeModal: () => {},
});

export function useModalContext(): ModalContextData {
  return useContext(ModalContext) as ModalContextData;
}

export function ModalContextProvider({ children }: { children: React.ReactNode }) {
  const [modalState, setModalState] = useState<ModalMap>(initialState);
  const router = useRouter();
  const pathname = usePathname();
  const openModal = (id: string, meta: any) => {
    setModalState((prevState) => ({
      ...prevState,
      [id]: { id, meta, open: true },
    }));
  };

  const closeModal = (id: string) => {
    setModalState((prevState) => ({
      [id]: { ...prevState[id], open: false },
    }));
  };

  // whenever a new modal opens, check the client cookie in order to continue or log out
  useEffect(() => {
    if (!document.cookie.includes("client_token=")) {
      if (JSON.stringify(modalState) !== "{}") {
        setModalState({});
        logOut(pathname);
      }
    }
  }, [modalState]);

  return (
    <ModalContext.Provider value={{ modalState, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}
