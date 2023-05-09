import { useContext } from "react";
import { PlayerContext } from "../../Contexts/PlayerContext";
import * as R from "ramda";

import Play from "../../assets/fill-play.svg";
import Star from "../../assets/star.svg";
import Dot from "../../assets/dot.svg";

export function ListMusics({ items, reateMusic }) {
   const { playMusic, currentMusic } = useContext(PlayerContext);

   const formatDuration = (number) => {
      return (number / 60).toFixed(2).replace(".", ":").padStart(2, "0");
   }

   return (
      <div>
         {
            items.map((music, trackIndex) => {
               const playingMusic = currentMusic?.id === music.id;

               return (
                  <div
                     key={music.id}
                     onClick={() => {
                        playMusic(items, trackIndex)
                     }}
                     style={playingMusic ? { opacity: 1, fontWeight: "600", backgroundColor: "rgb(18, 18, 18)" } : {}}
                     className="flex justify-between shadow-none relative text-[0.95rem] py-2 my-1 px-4 rounded-md opacity-90 cursor-pointer hover:opacity-100 hover:bg-black-150 hover:font-semibold"
                  >
                     <div className="flex gap-6 items-center">
                        <p
                           className="md:w-8 lg:w-10"
                        >
                           {playingMusic ? <Play className="w-5" /> : (music.track || "-")}
                        </p>

                        <p className="line-clamp-1">{music.title || R.nth(2, R.split("/", music.path))}</p>

                     </div>

                     <div
                        className="flex"
                     >
                        <div
                           className="flex col justify-center items-center w-24 h-full"
                        >
                           {R.range(0, 5).map((_, index) => (
                              <div
                                 key={index}
                                 onClick={(event) => {
                                    event.stopPropagation()
                                    reateMusic(trackIndex, index)
                                 }}
                              >
                                 {music.reated > index ? <Star /> : <Dot />}
                              </div>
                           ))}
                        </div>

                        <div className="w-16 text-end">{formatDuration(music.duration)}</div>
                     </div>
                  </div>
               )
            })
         }
      </div>
   )
}