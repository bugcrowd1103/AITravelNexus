import React, { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextType {
  isEmailModalOpen: boolean;
  isSuccessModalOpen: boolean;
  openEmailModal: () => void;
  closeEmailModal: () => void;
  openSuccessModal: () => void;
  closeSuccessModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const openEmailModal = () => {
    setIsEmailModalOpen(true);
  };

  const closeEmailModal = () => {
    setIsEmailModalOpen(false);
  };

  const openSuccessModal = () => {
    setIsSuccessModalOpen(true);
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        isEmailModalOpen,
        isSuccessModalOpen,
        openEmailModal,
        closeEmailModal,
        openSuccessModal,
        closeSuccessModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModalContext() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
}
