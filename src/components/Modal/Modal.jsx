import React, { useContext } from 'react';
import { ModalContext } from '../Contexts/ModalContext'; //
import modal from "./modal.module.css";

export const Modal = ({ title, content }) => {
  const { isOpen, closeModal } = useContext(ModalContext);

  if (!isOpen) return null;

  return (
    <div className={modal["modal-container"]}>
      <div className={modal["modal-overlay"]} onClick={closeModal}></div>
      <div className={modal["modal-content"]}>
        <div
          className={modal["modal-header"]}
        >
          <h2>{title}</h2>
          <div onClick={closeModal}>
            
          </div>
        </div>
        {content}
      </div>
    </div>
  );
};
