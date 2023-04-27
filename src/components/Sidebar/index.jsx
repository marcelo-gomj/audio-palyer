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
   const categories = [
      ["album", Disc, "Albums"],
      ["search", Search, "Pesquisar", true],
      ["artist", Artist, "Artista"],
      ["genre", Tag, "Genêros"],
      ["folder", Folder, "Pastas"],
      ["starlist", ListIcon, "Listas Especiais"],
      ["playlist", Playlist, "Playlists"],
      ["queue", Queue, "Fila", true],
      ["setting", Config, "Configuracões", true]
   ]

   return (
      <aside
         className="md:w-3/6 lg:w-2/6 bg-black-80"
      // className={sidebar["sidebar"]}
      >
         <div
            className="flex relative flex-col h-[calc(100%-2rem)] my-8 overflow-y-auto"
         >
            {
               categories.map(([path, Icon, text, unique]) => {
                  return (
                     <CategoryItem
                        key={path} path={path} unique={!!unique}
                     >
                        <Icon
                           className="w-6 h-6 opacity-50 group-hover:opacity-100"
                        />
                        <span className=" group-hover:text-white">{text}</span>
                     </CategoryItem>
                  )
               })
            }
         </div>
      </aside>
   )
}