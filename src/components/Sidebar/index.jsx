import aside from "./aside.module.css";

import Arrow from "../assets/arrow.svg";
import Disc from "../assets/disc.svg";
import Playlist from "../assets/playlist.svg";
import Queue from "../assets/queue.svg";
import ListIcon from "../assets/list.svg";

export function AsideLayout() {
   
   function handleOpenCategory(index){
      const arrow = document.querySelectorAll(".with-subcategory svg:last-child")[index];
      const subCategory = document.querySelectorAll(".sub-category")[index];
      
      arrow.classList.toggle("opened-category");
      subCategory.classList.toggle("open-sub-category");   
   }

   function handleQueue() {
      
   }

   function handleClickAlbums() {
      
   }

   return (
      <aside 
         className={aside["aside-element"]}
      >
         <div className="aside-container">
            <div 
               className="category-item" 
               id="albums-category"
            >
               <Disc />
               <span>Albúns</span>
            </div>

            <div className="category-container">
               <div 
                  className="category-item with-subcategory"
                  onClick={() => handleOpenCategory(0)}
               >
                  <ListIcon />
                  <span>Listas Especiais</span>
                  <Arrow />
               </div>

               <ul className="sub-category">
                  <li>Mais ouvidas</li>
                  <li>Melhores rocks</li>
                  <li>Top 10 Sertanejos</li>
                  <li>Top 20 Rocks</li>
                  <li>Anos 80</li>
               </ul>
            </div>

            <div className="category-container">
               <div 
                  className="category-item with-subcategory"
                  onClick={() => handleOpenCategory(1)}
               >
                  <Playlist />
                  <span>Playlists</span>
                  <Arrow />
               </div>

               <ul className="sub-category">
                  <li>Melhores Jorge e Mateus</li>
                  <li>Red Hot Chilly Peppers</li>
                  <li>Edson Gomes Melhores</li>
                  <li>Verão 2021</li>
               </ul>
            </div>

            <div className="category-item">
               <Queue />
               <span>Fila</span>
            </div>
         </div>
      </aside>
   )
}