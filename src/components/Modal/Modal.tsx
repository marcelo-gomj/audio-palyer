import React, { useContext, useState } from 'react';
import { ModalContext } from '../Contexts/ModalContext'; //

// import modal from "./modal.module.css";
import CloseIcon from "../assets/close.svg";

type T = any;
type ModalProps = {
   title: string | null,
   content: React.ReactElement<T>
}

export const Modal = ({ title, content }: ModalProps) => {
   const { isOpen, closeModal } = useContext(ModalContext);
   const [closeMove, setCloseMove] = useState(false)

   function handleCloseModal() {
      if (closeMove) return;
      setCloseMove(true)

      setTimeout(() => {
         setCloseMove(false)
         closeModal(false)
      }, 200);
   }

   if (!isOpen) return null;

   return (
      <div
         // className={`${modal["modal-container"]} ${closeMove ? modal["modal-close-exit"] : ""}`}
         className="flex justify-center bg-black-400 top-0 pt-[5%] w-full h-full z-50"
      >
         <div
            // className={modal["modal-overlay"]}
            className="absolute top-0 w-full h-full"
            onClick={handleCloseModal}
         ></div>

         <div
            // className={modal["modal-content"]}
            className="flex relative flex-col bg-[rgb(5,5,5)] rounded-2xl border-2 border-black-300 py-3 px-2 w-[38rem] h-[28rem] shadow-[1px_1px_20px_rgb(0,0,0,0.5)]"
         >
            <div
               // className={modal["modal-header"]}
               className="flex relative items-center justify-between my-1"
            >
               <h2
                  className="text-white text-center font-medium w-full text-[1.25rem]"
               >{title}</h2>
               <div
                  onClick={handleCloseModal}
                  // className={modal["modal-close-button"]}
                  className="p-1 border-2 hover:bg-black-300 border-[transparent] rounded-3xl cursor-pointer transition-[background_0.3s_linear]"
               >
                  <CloseIcon
                     className="w-7 h-7"
                  />
               </div>
            </div>
            {content}
         </div>
      </div>
   );
};
