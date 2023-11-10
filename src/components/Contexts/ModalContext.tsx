import React, { createContext, useState } from "react";
import { Modal } from "../Modal/Modal";

type ModalProviderProps = {
   children: React.ReactNode
}

type contentType = null | React.ReactElement | any;
type titleType = null | string;

type modalContextValue = {
   openModal: (title: titleType, content: contentType) => void,
   closeModal: (arg0: boolean) => void,
   isOpen: boolean
}

export const ModalContext = createContext<modalContextValue>({} as modalContextValue);

export function ModalProvider({ children }: ModalProviderProps) {
   const [isOpen, setIsOpen] = useState<boolean>(false);
   const [modalContent, setModalContent] = useState<contentType>(null);
   const [modalTitle, setModalTitle] = useState<titleType>(null);

   const openModal = (title: titleType, content: contentType) => {
      setModalTitle(title);
      setModalContent(content);
      setIsOpen(true);
   };

   const closeModal = () => {
      setModalTitle(null);
      setModalContent(null);
      setIsOpen(false);
   };

   return (
      <ModalContext.Provider
         value={{ isOpen, openModal, closeModal }}
      >
         {children}

         <Modal title={modalTitle} content={modalContent} />
      </ModalContext.Provider>
   )
}