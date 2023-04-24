import sidebar from "./sidebar.module.css";

import Arrow from "../assets/arrow.svg";
import Disc from "../assets/disc.svg";
import Playlist from "../assets/playlist.svg";
import Queue from "../assets/queue.svg";
import ListIcon from "../assets/list.svg";
import Search from "../assets/search.svg";
import Config from "../assets/config.svg";
import Artist from "../assets/artist.svg";
import Folder from "../assets/folder-icon.svg";
import Tag from "../assets/tag.svg"

import { CategoryItem } from "./CategoryItem";

export function AsideLayout() {

   return (
      <aside className={sidebar["sidebar"]}>
         <div className={sidebar["aside-container"]}>
            <CategoryItem path={"album"}>
               <Disc />
               Albums
            </CategoryItem>
            <CategoryItem path={"search"} unique>
               <Search />
               Pesquisar
            </CategoryItem>
            <CategoryItem path={"artist"}>
               <Artist />
               Artista
            </CategoryItem>
            <CategoryItem path="genre" >
               <Tag />
               Genêros
            </CategoryItem>
            <CategoryItem >
               <Folder />
               Pastas
            </CategoryItem>
            <CategoryItem >
               <ListIcon />
               Listas Especiais
            </CategoryItem>
            <CategoryItem >
               <Playlist path="playlists" />
               Playlists
            </CategoryItem>
            <CategoryItem unique>
               <Queue />
               Fila
            </CategoryItem>
            <CategoryItem unique>
               <Config />
               Configuracões
            </CategoryItem>
         </div>
      </aside>
   )
}