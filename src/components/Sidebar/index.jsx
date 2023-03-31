
import { useState } from "react";
import sidebar from "./sidebar.module.css";

import Arrow from "../assets/arrow.svg";
import Disc from "../assets/disc.svg";
import Playlist from "../assets/playlist.svg";
import Queue from "../assets/queue.svg";
import ListIcon from "../assets/list.svg";

export function AsideLayout({ handleCategory }) {
   const [starList, setStarList] = useState(false);
   const [playlist, setPlaylist] = useState(false);

   function handleOpenCategory(subcategory) {
      if(subcategory === "playlist") {
         setPlaylist((state) => !state)
         handleCategory("playlist");
      }

      if(subcategory === "starlist"){
         setStarList((state) => !state)
         handleCategory("starlist");

      }
   }

   function handleQueue() {
      handleCategory("queue");
   }

   function handleClickAlbums() {
      handleCategory("albums")
   }

   return (
      <aside className={sidebar["aside-container"]}>
         <div
            className={sidebar["category-item"]}
            id="albums-category"
            onClick={handleClickAlbums}
         >
            <Disc />
            <span>Albúns</span>
         </div>

         <div className={sidebar["category-container"]}>
            <div
               className={`${sidebar["category-item"]} ${sidebar["with-subcategory"]}`}
               onClick={() => handleOpenCategory("starlist")}
            >
               <ListIcon />
               <span>Listas Especiais</span>
               <Arrow className={starList ? sidebar["opened-category"] : ""}/>
            </div>

            <ul className={`${sidebar["sub-category"]} ${starList ? sidebar["open-sub-category"] : ""}`}>
               <li>Mais ouvidas</li>
               <li>Melhores rocks</li>
               <li>Top 10 Sertanejos</li>
               <li>Top 20 Rocks</li>
               <li>Anos 80</li>
            </ul>
         </div>

         <div className={sidebar["category-container"]}>
            <div
               className={`${sidebar["category-item"]} ${sidebar["with-subcategory"]}`}
               onClick={() => handleOpenCategory("playlist")}
            >
               <Playlist />
               <span>Playlists</span>
               <Arrow className={playlist ? sidebar["opened-category"] : ""}/>

            </div>

            <ul className={`${sidebar["sub-category"]} ${playlist ? sidebar["open-sub-category"] : ""}`}>
               <li>Melhores Jorge e Mateus</li>
               <li>Red Hot Chilly Peppers</li>
               <li>Edson Gomes Melhores</li>
               <li>Verão 2021</li>
            </ul>
         </div>

         <div className={sidebar["category-item"]}
            onClick={handleQueue}
         >
            <Queue />
            <span>Fila</span>
         </div>
      </aside>
   )
}