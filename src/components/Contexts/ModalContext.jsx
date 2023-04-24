import { createContext, useState } from "react";
import { Modal } from "../Modal/Modal";

export const ModalContext = createContext();

export function ModalProvider({ children }) {
   const [isOpen, setIsOpen] = useState(false);
   const [modalContent, setModalContent] = useState(null);
   const [modalTitle, setModalTitle] = useState(null);

   const openModal = (title, content) => {
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