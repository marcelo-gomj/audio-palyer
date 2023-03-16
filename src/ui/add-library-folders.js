const database = require('../../src/database');

const addFolders = () => {
   const modalSelect = document.createElement('div');

   modalSelect.innerHTML = `
      <section class="select-folders-container">
         <div class="select-folders-content">
            <h2>Selecione pastas de músicas</h2>
           
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
   query(".button-select-sources").addEventListener('click', (e) => {
      query("body").appendChild(addFolders())
   })
}


module.exports = {
   modalSelectLibrary,
   addFolders
}