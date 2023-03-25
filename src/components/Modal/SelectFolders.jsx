import { useContext, useState, useEffect } from 'react';
import { ModalContext } from "../Contexts/ModalContext";
const { ipcRenderer } = require("electron");
import { config } from "../../services/localStorage";
import { remove, length, slice, split, join, concat, uniq } from "ramda";

import Atualizar from "../assets/atualizar.svg";
import Add from "../assets/add.svg";
import Less from "../assets/less.svg";
import FolderIcon from "../assets/folder-icon.svg";

import modal from "./select-folders.module.css";

export function SelectFolderButton() {
   const { openModal } = useContext(ModalContext);

   function handleModalSelectFolder() {
      openModal(
         "Selecione as pastas de Música",
         <SelectFolder />
      )   
   }

   return (
      <div className={modal["nothing-source-library"]}>
         <div
            className={modal["button-select-sources"]}
            onClick={handleModalSelectFolder}
         >Selecione pastas de músicas</div>
      </div>
   )
}

export function SelectFolder() {
   const [listFolders, setListFolders] = useState([]);

   useEffect(() => {
      const { paths } = config("sources");

      if(paths) setListFolders(paths); 
   }, []);  

   function submitListFolders(paths) {
      setListFolders(paths);
      config("sources", { paths });
   }

   async function handleAddFolders(){
      const options = { properties: ['openDirectory', 'multiSelections'] }
      const pathResults  = await ipcRenderer.invoke('open-dialog', options);

      submitListFolders(uniq(concat(pathResults, listFolders)));
   }

   function handleUpdateSource(){

   }

   function handleRemoveFolder(index){
      const paths = remove(index, 1, listFolders)
      submitListFolders(paths);
   }

   return (
      <div className={modal["select-folders-container"]}>
         <div className={modal["list-folders-content"]}>
            <ul className={modal["list-folders"]}>
               {
                  listFolders.map((folder, index) => {
                     let pathFolder = ""
                     if (length(folder) > 50) {
                        pathFolder = join("", slice(0, 50, split("", folder))) + "...";
                     }

                     return (
                        <li 
                           key={folder} 
                           title={pathFolder ? folder : ""}
                           onClick={() => handleRemoveFolder(index)}
                        >
                           <FolderIcon />
                           { pathFolder || folder }
                           <Less />
                        
                        </li>
                     )
                  })
               }
            </ul>
         </div>

         <div className={modal["controllers-select-folders"]}>
            <div id={modal["add-folders"]} onClick={handleAddFolders}>
               Adicionar Pasta
               <Add />
            </div>
            <div id={modal["update-library"]} onClick={handleUpdateSource}>
               Atualizar
               <Atualizar />
            </div>
         </div>
      </div>
   )
}