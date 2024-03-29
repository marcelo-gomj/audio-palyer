import { Image } from "../ImageMeta";

import Play from "../assets/fill-play.svg";
import Star from "../assets/star.svg";
import Dot from "../assets/dot.svg";

import * as R from "ramda";
import { prisma } from "../../services/prisma";
import { useEffect, useState } from "react";
import { AlbumDatabase, AlbumsDatabase } from "../../types/database";

interface ListAlbumProps {
   list?: AlbumsDatabase,
   id: string,
   path?: string
}

export function ListAlbum({ list, id, path }: ListAlbumProps) {
   const [musics, updateMusics] = useState<AlbumsDatabase>([]);

   useEffect(() => {
      prisma.albums.findMany({
         where: { album: id },
         orderBy: {
            track: "asc"
         }
      }).then((album: AlbumsDatabase) => updateMusics(album))

   }, [])

   if (!musics.length) {
      return <></>
   }

   const details = musics[0];

   const formatDuration = (number: number) => {
      return (number / 60).toFixed(2).replace(".", ":")
   }

   const calcTimeTotalAlbum = (acc: any, music: AlbumDatabase) => {
      acc = acc + music.duration

      return acc
   }

   const reateMusic = (music: number, reate: number) => {
      musics[music].reated = reate + 1;
      updateMusics(musics)
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
                        [details.artist, details.genre, details.year]
                           .map((item, index) => (
                              <span className="font-medium opacity-50 cursor-pointer hover:opacity-100">{index ? "-" : ""} {item} </span>
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

               <div>Avaliacão {R.mean(musics.map(music => music.reated)).toFixed(2)}</div>
            </footer>
         </header>

         <div>
            {
               musics.map((music, trackIndex) => {
                  return (
                     <div
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
                                    onClick={() => {
                                       console.log("ativou")
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