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

import { useContext, useEffect, useRef, useState } from "react";
import * as R from "ramda";

export function PlayerControllers({ music, howl }) {
   const [duration, setDuration] = useState("")

   useEffect(() => {
      let duration;
      if (howl.playing()) {
         duration = setInterval(() => {
            const time = howl.seek();
            setDuration(Math.trunc(time / 60) + ":" + Math.trunc(time % 60))
         }, 500);
      }

      return () => {
         clearInterval(duration);
         setDuration("0:00")
      }

   }, [() => howl.playing() === true]);

   function playPauseMusic() {
      if (howl.playing()) {
         howl.pause()
      } else {
         howl.play()
      }
   }

   const controllersIcons = [
      { icons: [Shuffle], action: () => { } },
      { icons: [Previous], action: () => { } },
      { icons: [Play], action: playPauseMusic },
      { icons: [Next], action: () => { } },
      { icons: [Repeat, Normal, RepeatOne], action: () => { } }
   ]

   const extraIcons = [
      Equalize,
      Maximize
   ]

   return (
      <div className="flex w-full h-full">
         <div className="flex flex-col py-1 w-9/12 gap-1 h-full">

            <div className="flex font-medium items-center gap-4 text-[0.85rem] px-4 text-white-800">
               <p
               >{duration}</p>

               <div className="w-[100%] h-[0.25rem] rounded-lg bg-black-300 overflow-hidden">
                  <div className="w-[50%] h-full bg-white"></div>
               </div>

               <p>{Math.trunc(music.duration / 60) + ":" + Math.trunc(music.duration % 60)}</p>
            </div>

            <div className="flex items-center h-full font-bold">
               <div className="flex gap-6 mx-auto h-full">
                  {
                     controllersIcons.map(({ icons: [Icon, ActiveIcon], action }) => (
                        <div
                           className="flex items-center opacity-80 cursor-pointer h-full px-2 hover:opacity-100"
                           onClick={action}
                        >
                           <Icon className="h-6 w-6 stroke-[2.5px]" />
                        </div>
                     ))
                  }
               </div>
            </div>
         </div>

         <div className="flex flex-col justify-end sm:pl-8 lg:pl-16 gap-2 relative w-3/12 px-3 py-1">
            <div className="flex gap-2 items-center">
               <Volume className="w-5 h-5" />

               <div className="bg-black-300 w-full h-[0.25rem] rounded-sm overflow-hidden">
                  <div className="bg-white w-[65%] h-full"></div>
               </div>
            </div>

            <div className="inline-flex justify-end gap-5 h-full">
               {
                  extraIcons.map((Icon) => (
                     <span><Icon className="h-[1.1rem] w-[1.1rem] opacity-75" /></span>
                  ))
               }
            </div>
         </div>
      </div>
   )
}