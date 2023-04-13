const { createDatabase, read, write } = require('../../services/database');
const { query } = require("../../src/util");
const { ipcRenderer } = require("electron");
const { config } = require("../../services/localStorage");
const { slice, split, length, join, concat, remove } = require("ramda");

const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>`;
// const folderIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle></svg>`;
const folderIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>`

const handleRemoveFolder = (index) => {
   const res = config("sources");

   if(res){
      const { paths } = res;
      // const content = element.innerHTML;
      listFoldersItems(remove(index, 1, paths))
   }
}

const listFoldersItems = (result) => {
   const list = query(".list-folders");
   list.innerHTML = "";

   result.map((folder, index) => {
      const li = document.createElement("li");

      let pathfolder = folder;
      if (length(pathfolder) > 50) {
         pathfolder = join("", slice(0, 50, split("", pathfolder))) + "...";
         li.title = folder;
      }

      li.innerHTML = folderIcon + pathfolder + icon;
      list.appendChild(li);

      li.addEventListener("click", () => {
         handleRemoveFolder(index);
         list.removeChild(li);
      })

   });
}

const addFolders = () => {
   const modalSelect = document.createElement('div');

   modalSelect.innerHTML = `
      <section class="select-folders-container">
         <div class="select-folders-content">
            <div class="select-folders-header">
               <h2>Selecione pastas de músicas</h2>

               <div class="select-folder-close">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
               </div>
            </div>
           
            <div class="list-folders-container">
               <ul class="list-folders">
                 
               </ul>
            </div>

            <div class="controllers-select-folders">
               <div id="add-folders">
                  Adicionar Pasta
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
               </div>
               <div id="update-library">
                  Atualizar
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 2v6h6M2.66 15.57a10 10 0 1 0 .57-8.38"/></svg>
               </div>
            </div>
         </div>
      </section>
   `;

   
   query("body").appendChild(modalSelect);
   
   query("#add-folders").addEventListener("click", async () => {
      const options = { properties: ['openDirectory', 'multiSelections'] }
      const pathResults  = await ipcRenderer.invoke('open-dialog', options);
      const lastPaths = config("sources")?.paths || [];

      const paths = concat(pathResults, lastPaths);

      config("sources", { paths })
      listFoldersItems(paths);
   })

   query(".select-folder-close").addEventListener('click', () => {
      query("body").removeChild(modalSelect);
   });

   return modalSelect;
}



const modalSelectLibrary = (content) => {
   const modalSelect = document.createElement('div');
   modalSelect.innerHTML = `
      <div class="nothing-source-library">
         <div class="button-select-sources">Selecione pastas de músicas</div>
      </div>
   `

   content.appendChild(modalSelect);

   query(".button-select-sources").addEventListener('click', async (e) => {
      const { paths } = config("sources") || {};

      addFolders()
      // const content = element.innerHTML;
      listFoldersItems(paths || [])
   })      
}


module.exports = {
   modalSelectLibrary,
   addFolders,
   listFoldersItems
}