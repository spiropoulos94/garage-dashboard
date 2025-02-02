"use client";

import LazyComponent from "../LazyComponent";
import { useModalContext } from "@/app/contexts/ModalContext";

interface ModalRendererProps {
  children: React.ReactNode;
}

export interface ModalMeta {
  [name: string]: any;
}

export type Modal = {
  id: string;
  open: boolean;
  meta?: ModalMeta;
};

export type ModalMap = {
  [id: string]: Modal;
};

const ModalRenderer = (props: ModalRendererProps) => {
  const { modalState } = useModalContext();

  // find all open modals from modals context and render them
  const modals = Object.keys(modalState)
    .map((id) => modalState[id])
    .filter((modal) => modal.open);

  return (
    <>
      {modals.map(({ id: filename, meta }) => (
        <LazyComponent key={filename} filename={filename} meta={meta} />
      ))}
      {props.children}
    </>
  );
};

export default ModalRenderer;
