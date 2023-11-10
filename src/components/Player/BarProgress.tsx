import React, { useContext, useState, useEffect } from "react";
import { PlayerContext } from "../Contexts/PlayerContext";
import { calcDuration } from "../../util/util";
import { progressDuration } from "../../services/howler";

type Event = React.MouseEvent<HTMLDivElement, MouseEvent>

export function BarProgress() {
   const { handleHowl, currentMusic } = useContext(PlayerContext);
   const [duration, setDuration] = useState(0);

   useEffect(() => {
      let timer: any;

      if (handleHowl) {
         timer = setInterval(() => {
            setDuration(handleHowl(progressDuration))
         }, 500);
      }

      return () => {
         clearInterval(timer);
      }
   }, [handleHowl]);

   function handleProgressBar({ clientX, currentTarget: { offsetLeft, offsetWidth } }: Event) {
      if (currentMusic) {
         const progress = (currentMusic.duration / 100) * (((clientX - offsetLeft) / offsetWidth) * 100);

         setDuration(
            handleHowl(progressDuration, progress)
         )
      }
   }

   function handleTimeBar(duration: number) {
      if (currentMusic) {
         return ((duration / (currentMusic.duration)) * 100)
      }

      return 0
   }

   return (
      <div className="flex font-medium items-center text-center gap-4 text-[0.85rem] mx-4 text-white-800">
         <p
            className="w-[3rem]"
         >
            {calcDuration(duration)}
         </p>

         <div
            className="flex relative items-center w-full h-full group"
            onClick={handleProgressBar}
            onMouseDown={handleProgressBar}
         >
            <div
               className="relative w-full h-[0.25rem] rounded-lg bg-black-300 group-hover:h-[0.40rem] z-[999] overflow-hidden"
            >
               <div
                  className={`absolute w-full h-full bg-white rounded-lg -z-50`}
                  style={{ left: "-" + (100 - handleTimeBar(duration)).toFixed(4) + "%" }}
               >
               </div>
            </div>
         </div>

         <p
            className="w-[3.3rem]"
         >{calcDuration(currentMusic?.duration || 0)}</p>
      </div>
   )
}