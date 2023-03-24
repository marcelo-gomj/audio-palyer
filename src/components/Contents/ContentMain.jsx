import { useContext } from "react"
import { ModalContext } from "../Contexts/ModalContext"

export function ContentMain({ category }) {
   const { openModal } = useContext(ModalContext);

   function handleModalSelectFolder() {
      openModal(
         "Selecione a pasta",
         "Hello WORLD"
      )   
   }

   function generateContent(category) {
      if(category === "albums"){


         return (
            <div className="nothing-source-library">
               <div 
                  className="button-select-sources"
                  onClick={handleModalSelectFolder}
               >Selecione pastas de músicas</div>
            </div>
         )
      }
   }

   return (
      <div className="content">
         {
            generateContent(category)
         }
      </div>
   )
}