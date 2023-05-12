import { useContext, useEffect, useState } from "react";
import Play from "../assets/play.svg";
import Previous from "../assets/previous.svg";
import Next from "../assets/next.svg";
import Shuffle from "../assets/shuffle.svg";

import Repeat from "../assets/repeat.svg";
import RepeatOne from "../assets/repeat-one.svg";
import Normal from "../assets/repeat-normal.svg";

import Volume from "../assets/volume.svg";
import Maximize from "../assets/fullscreen.svg";
import Equalize from "../assets/equalize.svg";

import { calcDuration } from "../../util/util";
import * as R from "ramda";
import { BarProgress } from "./BarProgress";
import { controlVolume, nextMusic, playPauseMusic } from "../../services/howler";
import { PlayerContext } from "../Contexts/PlayerContext";
import { store } from "../../services/electronStore";

export function PlayerControllers() {
   const { handleHowl, handleNextMusic } = useContext(PlayerContext);
   const [volume, setVolume] = useState(1)

   function toggleShuffle() {
      const shuffle = store.get("shuffle");

      store.set("shuffle", !shuffle);

   }

   const controllersIcons = [
      { icons: [Shuffle], action: () => toggleShuffle() },
      { icons: [Previous], action: () => handleNextMusic() },
      { icons: [Play], action: () => handleHowl(playPauseMusic) },
      { icons: [Next], action: () => handleNextMusic(true) },
      { icons: [Repeat, Normal], action: () => undefined },
   ];

   function volumeBar(event) {
      const { clientX, currentTarget: { offsetLeft, offsetWidth } } = event;
      const volume = Number(((clientX - offsetLeft) / offsetWidth));

      handleHowl(controlVolume, volume);
      setVolume(volume);
   }

   const extraIcons = [
      Equalize,
      Maximize
   ];

   return (
      <div className="flex w-full h-full">
         <div className="flex flex-col py-1 w-9/12 gap-1 h-full ">

            <BarProgress />

            <div className="flex items-center h-full font-bold">
               <div className="flex gap-6 mx-auto h-full">
                  {
                     controllersIcons.map(({ icons, action }, box) => {

                        return (
                           icons.map((Icon, index) => (

                              <div
                                 className="flex items-center opacity-80 cursor-pointer h-full px-2 hover:opacity-100"
                                 onClick={action}
                                 key={box + index}
                              >
                                 <Icon className="h-6 w-6 stroke-[2.5px]" />
                              </div>

                           ))
                        )
                     })
                  }
               </div>
            </div>
         </div>

         <div className="flex flex-col justify-end sm:pl-4 lg:pl-16 gap-2 w-3/12 px-3 py-1">
            <div
               className="flex gap-2 items-center"
            >
               <Volume className="w-5 h-5" />

               <div
                  className="flex items-center h-full w-full"
                  onClick={volumeBar}
               >
                  <div
                     className="relative bg-black-300 w-full h-[0.36rem] rounded-md overflow-hidden z-[400]"
                  >
                     <div
                        className="absolute left-[-100%]  rounded-md bg-white w-full h-full"
                        style={{ transform: "translateX(" + (volume * 100) + "%)" }}
                     ></div>
                  </div>
               </div>
            </div>

            <div className="inline-flex justify-end gap-5 h-full">
               {
                  extraIcons.map((Icon, index) => (
                     <span key={index}>
                        <Icon className="h-[1.1rem] w-[1.1rem] opacity-75" />
                     </span>
                  ))
               }
            </div>
         </div>
      </div >
   )
}