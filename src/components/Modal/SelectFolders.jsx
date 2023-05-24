import { useContext, useState, useEffect } from 'react';
import { ModalContext } from "../Contexts/ModalContext";
const { ipcRenderer } = require("electron");
import { config } from "../../services/localStorage";
import { remove, length, slice, split, join, concat, uniq } from "ramda";

import Atualizar from "../assets/atualizar.svg";
import Add from "../assets/add.svg";
import Less from "../assets/less.svg";
import FolderIcon from "../assets/folder-icon.svg";

// import modal from "./select-folders.module.css";

export function SelectFolderButton() {
   const { openModal } = useContext(ModalContext);

   function handleModalSelectFolder() {
      openModal(
         "Selecione as pastas de Música",
         <SelectFolder />
      )
   }

   return (
      <div
         // className={modal["nothing-source-library"]}
         className="flex justify-center items-center w-full h-1/2"
      >
         <div
            // className={modal["button-select-sources"]}
            className="border-2 border-black-200 font-medium text-xl px-8 rounded-full py-2 cursor-pointer hover:bg-black-200 hover:border-black-400 transition-[border-color_200ms-ease]"
            onClick={handleModalSelectFolder}
         // className="text-white"
         >Selecione pastas de músicas</div>
      </div>
   )
}

export function SelectFolder() {
   const [listFolders, setListFolders] = useState([]);

   useEffect(() => {
      const { paths } = config("sources");

      if (paths) setListFolders(paths);
   }, []);

   function submitListFolders(paths) {
      setListFolders(paths);
      config("sources", { paths });
   }

   async function handleAddFolders() {
      const options = { properties: ['openDirectory', 'multiSelections'] }
      const pathResults = await ipcRenderer.invoke('open-dialog', options);

      submitListFolders(uniq(concat(pathResults, listFolders)));
   }

   function handleUpdateSource() {

   }

   function handleRemoveFolder(index) {
      const paths = remove(index, 1, listFolders)
      submitListFolders(paths);
   }

   return (
      <div 
         // className={modal["select-folders-container"]}
      
      >
         <div 
            // className={modal["list-folders-content"]}
            className="pt-[1.4rem] pb-[1rem]"
         >
            <ul 
               // className={modal["list-folders"]}
               className="flex relative flex-col gap-3 py-2 h-72 overflow-y-auto"
            >
               {
                  listFolders.map((folder, index) => {
                     let pathFolder = ""
                     if (length(folder) > 50) {
                        pathFolder = join("", slice(0, 50, split("", folder))) + "...";
                     }

                     return (
                        <li
                           key={folder}
                           className="flex group items-center relative p-[0.5rem_2rem_0.5rem_1rem] text-[0.96rem] text-white-500 break-all cursor-pointer transition-colors duration-200 ease-linear hover:text-white active:font-normal"
                           title={pathFolder ? folder : ""}
                           onClick={() => handleRemoveFolder(index)}
                        >
                           <FolderIcon 
                              className="first: mr-4 stroke-white-500 w-5 group-hover:stroke-white"
                           />
                           {pathFolder || folder}
                           <Less 
                              className="hidden absolute stroke-red right-4 top-0 w-6 group-hover:block group-hover:border-[1px_solid_transparent]"
                           />

                        </li>
                     )
                  })
               }
            </ul>
         </div>

         <div 
            // className={modal["controllers-select-folders"]}
               className="flex absolute bottom-4 left-0 w-full"
         >
            <div 
               // id={modal["add-folders"]} 
               id="add-folders" 
               className="flex items-center justify-center gap-3 py-2 text-center mx-8 border-[transparent] border-2 w-full font-medium rounded-[20px] cursor-pointer duration-300 transition-[background-color,opacity_0.3s_linear] hover:border-black-300 hover:bg-black-150 hover:shadow-[1px_1px_20px_black] active:bg-black-100"
               onClick={handleAddFolders}
            >
               Adicionar Pasta
               <Add 
                  className="w-[1.4rem] h-[1.4rem]"
               />
            </div>
            <div 
               // id={modal["update-library"]} 
               id="update-library"
               className="flex items-center justify-center gap-3 py-2 text-center mx-8 border-[transparent] border-2 w-full font-medium rounded-[20px] cursor-pointer duration-300 transition-[background-color,opacity_0.3s_linear] hover:border-black-300 hover:bg-black-150 hover:shadow-[1px_1px_20px_black] active:bg-black-100"
               onClick={handleUpdateSource}
            >
               Atualizar
               <Atualizar 
                  className="w-[1.1rem] h-[1.1rem]"
               />
            </div>
         </div>
      </div>
   )
}