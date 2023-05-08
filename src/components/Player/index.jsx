import { useContext } from "react";
import { PlayerContext } from "../Contexts/PlayerContext";
import { AlbumStatus } from "./AlbumStatus";
import { PlayerControllers } from "./PlayerControllers";

export function PlayerFooter() {
   const { currentMusic } = useContext(PlayerContext);
   const playingNow = currentMusic;
   const content = {
      title: playingNow.title,
      album: playingNow.album,
      duration: playingNow.duration.toFixed(2),
   }

   return (
      <footer
         className="relative p-1 z-50 w-full h-[5.6rem]"
      >
         <div className="flex w-full bg-black-150 h-full px-3 rounded-lg overflow-hidden border-[1.5px] border-black-400">
            <AlbumStatus
               path={playingNow.path}
               content={content}
            />

            <PlayerControllers />
         </div>
      </footer>
   )
}