import { useContext } from "react";
import { PlayerContext } from "../Contexts/PlayerContext";
import { AlbumStatus } from "./AlbumStatus";
import { PlayerControllers } from "./PlayerControllers";

export function PlayerFooter() {
   return (
      <footer
         className="relative p-1 z-50 w-full h-[5.6rem]"
      >
         <div className="flex w-full bg-black-150 h-full px-3 rounded-lg overflow-hidden border-[1.5px] border-black-400">
            <AlbumStatus />

            <PlayerControllers />
         </div>
      </footer>
   )
}