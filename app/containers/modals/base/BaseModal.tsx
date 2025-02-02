"use client";

export interface BaseModalProps {
  children: string | React.ReactNode;
}

export const BaseModal = (props: BaseModalProps) => {
  const { children } = props;

  return (
    <div
      id="static-modal"
      data-modal-backdrop="static"
      tabIndex={-1}
      aria-hidden="true"
      className="fixed left-0 right-10 top-0 z-50 flex h-full max-h-full  w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-900/50 "
    >
      <div className="relative max-h-full w-full max-w-lg">
        <div className="modalCard relative rounded-lg border-2 bg-white p-6 shadow dark:bg-gray-700">
          {children}
        </div>
      </div>
    </div>
  );
};
