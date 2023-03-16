const { query } = require('../src/util');
const { loadAlbums } = require("../src/loadAlbums");
const { addFolders, modalSelectLibrary } = require("../src/ui/add-library-folders");
const { createDatabase, read, write } = require("../src/database");
const fs = require("fs");
const { ipcRenderer } = require("electron");
const R = require("ramda");

const listenCategoryClick = (category, index) => {
   const arrow = query(".with-subcategory img")[index];
   const subCategory = query(".sub-category")[index];

   category.addEventListener("click", () => {
      arrow.classList.toggle("opened-category");
      subCategory.classList.toggle("open-sub-category");
   })
}

const showContent = (container) => {
   const contentElement = query(container);
   return (content) => {
      contentElement.innerHTML = "";
      contentElement.innerHTML = content;
   }
}

const setContent = showContent(".content");
modalSelectLibrary(query(".content"));



const handleReadLibraryData = (sources) => {
   if(R.isEmpty(sources)) {
      setContent(modalSelectLibrary());
   }
}

const listAlbumsContent = (event) => {
   const albumContent = "albums-category";
   const sourceLibrary = createDatabase("source-library");

   sourceLibrary(read, "sources", handleReadLibraryData );
}

query(".with-subcategory").map( listenCategoryClick );

query("#albums-category").addEventListener("click", listAlbumsContent );

// const addModal = addFolders();
// query("body").appendChild(addModal);

// const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>`;
// // const folderIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle></svg>`;
// const folderIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>`

// query(".list-folders").innerHTML = "";
// const listFolders = [];

// query("#add-folders")[0].addEventListener("click", async (event) => {
//    const options = { properties: ['openDirectory', 'multiSelections'] }
//    const result = await ipcRenderer.invoke('open-dialog', options);

//    console.log("LISTA FOLDERS", listFolders);

   // listFolders.push(...result)

//    const listFolders = [
//       "D:\\Música\\A Hora É Agora - Ao Vivo Em Jurerê (Edição Bônus)",
//       "D:\\Música\\Aerosmith - Tough Love; Best Of The Ballads (2011)",
//       "D:\\Música\\Bohemian Rhapsody (The Original Soundtrack)",
//       "D:\\Música\\Bruno & Marrone",
//       "D:\\Música\\Bruno Mars - 24K Magic",
//       "D:\\Música\\CD JOÃO GOMES - Eu Tenho a Senha",
//       "D:\\Música\\CD Marilia Mendonca Todos os Cantos AO Vivo",
//       "D:\\Música\\CD PROMOCIONAL ATUALIZADO 2022 LUCIANO LINS",
//       "D:\\Música\\Edson Gomes",
//       "D:\\Música\\EP Eu & Vocês - Felipe Araújo",
//       "D:\\Música\\Eric Land - Paredao da Copa",
//       "D:\\Música\\Felipe Araújo - Check",
//       "D:\\Música\\Felipe Araújo - Felipe Araújo In Brasília (Ao Vivo _ Vol.1)",
//       "D:\\Música\\Felipe Araújo - Felipe Araújo In Brasília (Ao Vivo _ Vol.2)",
//       "D:\\Música\\Foo Fighter",
//       "D:\\Música\\Guitar Hero 4",
//       "D:\\Música\\Gusttavo Lima - Buteco in Boston, Vol. 1 (Ao Vivo) (2021)",
//       "D:\\Música\\Henrique & Juliano - Ao Vivo no Ibirapuera, Vol. 1",
//       "D:\\Música\\Henrique e Juliano - Manifesto Musical, Vol. 2 (2022)",
//       "D:\\Música\\Hot 50 55th Anniversary - The All-Time Top 100 Songs",
//       "D:\\Música\\Jorge & Mateus - 10 Anos",
//       "D:\\Música\\Jorge & Mateus - Aí Já Era",
//       "D:\\Música\\Jorge & Mateus - Ep Tudo Em Paz",
//       "D:\\Música\\Jorge & Mateus - Live In London - At The Royal Albert Hall",
//       "D:\\Música\\Jorge & Mateus - Live In London - At The Royal Albert Hall EXTRA",
//       "D:\\Música\\Jorge & Mateus - T. E. P., EP 1",
//       "D:\\Música\\Jorge & Mateus - Terra Sem Cep (ao Vivo)",
//       "D:\\Música\\Jorge & Mateus - Tudo Em Paz",
//       "D:\\Música\\Jorge e Mateus - CD Como Sempre Feito Nunca",
//       "D:\\Música\\Jorge e Mateus - Os Anjos Cantam",
//       "D:\\Música\\Luana Prado",
//       "D:\\Música\\Malta - Indestrutível",
//       "D:\\Música\\Malta - Malta IV (2019)",
//       "D:\\Música\\Marília Mendonça - Marília Mendonça - Ao Vivo",
//       "D:\\Música\\Marília Mendonça - Patroas 35%",
//       "D:\\Música\\Marília Mendonça - Perfil (2018)",
//       "D:\\Música\\Marília Mendonça - Realidade - Ao Vivo Em Manaus (2017)",
//       "D:\\Música\\Marília Mendonça - Todos Os Cantos, Vol. 3 (ao Vivo)",
//       "D:\\Música\\Michel Teló - Churrasco do Teló – EP Quintal (ao Vivo)",
//       "D:\\Música\\Michel Teló - Churrasco do Teló, Vol. 2 (ao Vivo)",
//       "D:\\Música\\Murilo Huff - Pra Ouvir Tomando Uma 3, Vol. 2 (2022)",
//       "D:\\Música\\No Doubt - Tragic Kingdom",
//       "D:\\Música\\Onze 20",
//       "D:\\Música\\Papa Roach - Top 10",
//       "D:\\Música\\Paramore",
//       "D:\\Música\\Pedro Cavalcante - O PC Chegou",
//       "D:\\Música\\Piauí",
//       "D:\\Música\\Playlists",
//       "D:\\Música\\Por Inteiro (Ao Vivo) - Felipe Araújo",
//       "D:\\Música\\Potência Sertaneja Agosto",
//       "D:\\Música\\Pro Evolution Soccer 2017",
//       "D:\\Música\\Projota - Tributo Aos Sonhadores I",
//       "D:\\Música\\Red Hot Chili Peppers - The Best Songs - 2016",
//       "D:\\Música\\Red Hot Chili Peppers - Unlimited Love",
//       "D:\\Música\\Scalene - Real-Surreal",
//       "D:\\Música\\The Answer - Rise",
//       "D:\\Música\\The Best of Michel Jackson",
//       "D:\\Música\\The Best of Rock",
//       "D:\\Música\\The Classics of Rock",
//       "D:\\Música\\The Getaway",
//       "D:\\Música\\The Rocks Forever",
//       "D:\\Música\\Todos Os Cantos, Vol. 1 (Ao Vivo)",
//       "D:\\Música\\Van Halen - 1984 (Japan, Warner Bros. 32XD-313)",
//       "D:\\Música\\viloes-do-forro-e-karkara-ainda-mais-forrozeiro",
//       "D:\\Música\\Xand avião",
//       "D:\\Música\\Zé Neto & Cristiano - Chaaama",
//       "D:\\Música\\Zé Neto & Cristiano - Por Mais Beijos Ao Vivo, Ep1 - Ao Vivo - www.SoCdsGratis.top",
//       "D:\\Música\\Zé Neto & Cristiano - Tarja Preta, Ep. 1",
//       "D:\\Música\\Zé Neto e Cristiano - Esquece o Mundo Lá Fora (Ao Vivo) (2018)"
//   ]

//    query(".list-folders").innerHTML = "";
   
//    console.log(listFolders);

//    listFolders.map((folder, index) => {
//       const li = document.createElement("li");

//       let pathfolder = folder;
//       if(pathfolder.length > 50){
//          pathfolder = R.join("", R.slice(0, 50, R.split("", pathfolder))) + "...";
//          li.title = folder;
//       }
   
   
//       li.innerHTML = folderIcon + pathfolder + icon;
//       query(".list-folders").appendChild(li);

//       li.addEventListener("click", () => {
//          query(".list-folders").removeChild(li);
//       })

//    // });

// })