import { Image } from "../../ImageMeta";
import { prisma } from "../../../services/prisma";

import Play from "../../assets/fill-play.svg";
import Star from "../../assets/star.svg";
import Dot from "../../assets/dot.svg";

import * as R from "ramda";
import { useEffect, useState } from "react";


export function ListAlbum({ path, id }) {
   const [musics, updateMusics] = useState([]);


   useEffect(() => {
      prisma.albums.findMany({
         where: { [path]: id },
         orderBy: {
            track: "asc"
         }
      }).then((musics) => updateMusics(musics))

   }, [id])

   if (!musics.length) {
      return <></>
   }

   const details = musics[0];


   const formatDuration = (number) => {
      return (number / 60).toFixed(2).replace(".", ":");
   }

   const calcTimeTotalAlbum = (acc, music) => {

      acc = acc + music.duration

      return acc
   }

   const reateMusic = async (music, reate) => {
      updateMusics((state) => {
         state[music].reated = reate + 1;
         return [...state]
      })

      await prisma.albums.update({
         where: {
            id: musics[music].id
         },
         data: musics[music]
      })
   }


   return (
      <section
         className="w-full h-full px-10 py-6 overflow-auto"
      >
         <header>
            <div
               className="flex gap-10 mb-6"
            >
               <div className="shadow-[2px_2px_5px_black] rounded-lg overflow-hidden min-w-[8rem] min-h-[8rem]">
                  <Image
                     path={details.path}
                     len={"w-[8rem] h-[8rem]"}
                  />
               </div>

               <div>

                  <h3
                     className="font-semibold text-2xl py-2"
                  >
                     {details.album}
                  </h3>

                  <div
                     className=""
                  >
                     {
                        [details.artist, details.genre, details.year].filter(item => item)
                           .map((item, index) => (
                              <>
                                 <span className="opacity-50 mr-2">{index ? ", " : ""}</span>
                                 <span className="font-medium opacity-50 cursor-pointer hover:opacity-100">{item || "-"} </span>
                              </>
                           ))
                     }
                  </div>
               </div>
            </div>

            <footer
               className="flex gap-12 items-center text-white-500 font-semibold pb-2 mb-4 border-b-black-200"
            >
               <div
                  className="flex gap-2 text-white cursor-pointer py-1.5 px-4 rounded-full bg-black-200 hover:bg-black-300 transition-[background_0.2s_ease]"
               >
                  <Play />
                  <span>Reproduzir</span>
               </div>

               <div>{formatDuration(R.reduce(calcTimeTotalAlbum, 0, musics))} min</div>

               <div>{musics.length} músicas</div>

               <div>Avaliacão {R.mean(musics.map(music => music.reated)).toFixed(2) * 2}</div>
            </footer>
         </header>

         <div>
            {
               musics.map((music, trackIndex) => {
                  return (
                     <div
                        key={music.id}
                        className="flex shadow-none relative text-[0.95rem] py-2 my-1 px-4 rounded-md opacity-90 cursor-pointer hover:opacity-100 hover:bg-black-150 hover:font-semibold"
                     >
                        <span
                           className="pr-10"
                        >
                           {music.track || "-"}
                        </span>

                        <p>{music.title}</p>

                        <span
                           className="flex absolute items-center right-4"
                        >
                           <div className="flex col pr-10">
                              {R.range(0, 5).map((_, index) => (
                                 <span
                                    key={index}
                                    onClick={() => {
                                       reateMusic(trackIndex, index)
                                    }}
                                 >{music.reated > index ? <Star /> : <Dot />}</span>
                              ))}
                           </div>


                           {formatDuration(music.duration)}
                        </span>
                     </div>
                  )
               })
            }
         </div>
      </section>
   )
}