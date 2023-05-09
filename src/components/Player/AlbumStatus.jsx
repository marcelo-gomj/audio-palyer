import { useContext } from "react";
import { PlayerContext } from "../Contexts/PlayerContext";
import { Image } from "../ImageMeta";

import Mini from "../assets/mini.svg";
import Disc from "../assets/disc.svg";

export function AlbumStatus() {
   const { currentMusic } = useContext(PlayerContext);
   console.log("CURRENT MUSIC", currentMusic)
   const status = {
      title: currentMusic?.title,
      album: currentMusic?.album,
      path: currentMusic?.path
   }

   return (
      <div className="flex relative items-center gap-4 md:w-4/12 lg:w-4/12 cursor-pointer">
         <div className="flex items-center">
            {
               status.path ?
                  <Image
                     path={status.path}
                     len={"w-12 h-12 rounded-[4px]"}
                  />

                  :

                  <div className="flex items-center justify-center w-12 h-12">
                     <Disc className="" />
                  </div>
            }
         </div>

         <div className="py-2 w-full pr-5">
            <h4 className="font-semibold md:text-sm lg:text-base leading-[1.2rem] line-clamp-2">{status.title || null}</h4>
            <p className="text-[0.85rem] line-clamp-1 text-white-400 font-medium">{status.album || null}</p>
         </div>

         <Mini className="absolute w-5 h-5 right-1 bottom-2" />
      </div>
   )
}
