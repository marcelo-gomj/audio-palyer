import { useContext } from "react";

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
import { RouteContext } from "../Contexts/RouteContext";

export function AsideLayout() {
   const { route } = useContext(RouteContext);

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
         className="md:w-3/6 lg:w-2/6 bg-black-80 h-full pt-8"
      >
         <div
            className="flex relative flex-col h-full pr-2 overflow-y-auto"
         >
            {
               categories.map(([path, Icon, text, unique]) => {
                  const activePath = path === route.path;

                  return (
                     <CategoryItem
                        key={path} path={path} unique={!!unique}
                     >
                        <Icon
                           className={`w-5 h-5 group-hover:opacity-100 ${activePath ? "opacity-100" : "opacity-60"}`}
                        />

                        <span
                           className={`${activePath && "text-white"} font-medium text-lg group-hover:text-white`}
                        >
                           {text}
                        </span>
                     </CategoryItem>
                  )
               })
            }
         </div>
      </aside>
   )
}