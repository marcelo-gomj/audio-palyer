const { loadAlbums } = require("../src/loadAlbums");
const { createDatabase, read, write } = require("../src/database");
const fs = require("fs");

const query = (className) => {
   return [...document.querySelectorAll(className)];
}

const listenCategoryClick = (category, index) => {
   const arrow = query(".with-subcategory img")[index];
   const subCategory = query(".sub-category")[index];

   category.addEventListener("click", () => {
      arrow.classList.toggle("opened-category");
      subCategory.classList.toggle("open-sub-category");
   })
}

query(".with-subcategory").map( listenCategoryClick );

query("#albums-category")[0].addEventListener("click", async (event) => {
   const library = createDatabase("library");
   
   library( write, { title: "test" }, (data) => {
      console.log(data);
   });

   library( read, {}, (data) => {
      console.log(data);
   });

   // console.log("INPUT");
   // const data = await loadAlbums();
   // console.log("ETAPA FINAL", data)

   // query(".content")[0].innerHTML = "";

   // data.map(({ common, format }, index) => {
   //    const seconds = Math.round(format.duration % 60) + "";
   //    const time = Math.floor(format.duration / 60) + ":" + ( seconds.length === 1 ? "0" + seconds : seconds );
      
   //    if(common.album !== data[index - 1]?.common.album) {	
   //       const content =query(".content")[0]
   //       // const blob = new Blob([common.picture[0].data], { type: common.picture[0].format });
   //       // const blobUrl = URL.createObjectURL(blob);
   //       // const img = document.createElement("img");
   //       // img.src = blobUrl;
         
   //       content.innerHTML += `<div class="header-album">${common.album + " " + common.artist}</div>`;
   //       // query(".header-album")[id].appendChild(img); 
   //    }

   //    query(".content")[0].innerHTML += `<li><div><span>${index} </span> <span>${common.title}</span></div> <div><span>${ time }</span></div></li>`
   // })
})