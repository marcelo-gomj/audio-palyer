import { useContext, useState } from 'react';
import { ModalContext } from '../Contexts/ModalContext'; //

import modal from "./modal.module.css";
import CloseIcon from "../assets/close.svg";

export const Modal = ({ title, content }) => {
  const { isOpen, closeModal } = useContext(ModalContext);
  const [closeMove, setCloseMove] = useState(false)
  
  function handleCloseModal(){
    if(closeMove) return;
    setCloseMove(true)
    
    setTimeout(() =>{
      setCloseMove(false)
      closeModal(false)
    }, 200);
  }

  if (!isOpen) return null;

  return (
    <div 
      className={`${modal["modal-container"]} ${closeMove ? modal["modal-close-exit"] : ""}`}
    >
      <div 
        className={modal["modal-overlay"]} 
        onClick={handleCloseModal}
      ></div>
      
      <div 
        className={modal["modal-content"]}
      >
        <div
          className={modal["modal-header"]}
        >
          <h2>{title}</h2>
          <div 
            onClick={handleCloseModal}
            className={modal["modal-close-button"]}
          >
            <CloseIcon />
          </div>
        </div>
        {content}
      </div>
    </div>
  );
};
