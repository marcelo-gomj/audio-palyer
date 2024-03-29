import { useContext, useEffect, useState } from "react";
import * as R from "ramda";

import { Image } from "../../ImageMeta";
import { prisma } from "../../../services/prisma";
import { PlayerContext } from "../../Contexts/PlayerContext";
import { ListMusics } from "./listMusics";

import Play from "../../assets/fill-play.svg";
import { playPauseMusic } from "../../../services/howler";
import { AlbumDatabase, AlbumsDatabase } from "../../../types/database";

type ListAlbumProps = {
   path: string,
   id: string
}

export function ListAlbum({ path, id }: ListAlbumProps) {
   const { playMusic } = useContext(PlayerContext);
   const [musics, updateMusics] = useState<AlbumsDatabase>([]);

   useEffect(() => {
      prisma.albums.findMany({
         where: { [path]: id },
         orderBy: {
            track: "asc"
         }
      }).then((musics: AlbumsDatabase) => updateMusics(musics))

   }, [id])

   if (!musics.length) {
      return <></>
   }

   const details = musics[0];


   const formatDuration = (number: number) => {
      return (number / 60).toFixed(2).replace(".", ":");
   }

   const calcTimeTotalAlbum = (acc: number, music: AlbumDatabase) => {

      acc = acc + music.duration

      return acc
   }

   const reateMusic = async (music: number, reate: number) => {
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
                     {details.album || R.nth(1, R.split("/", details.path))}
                  </h3>

                  <div
                     className=""
                  >
                     {
                        [details.artist, details.genre, details.year].filter(item => item)
                           .map((item, index) => (
                              <div
                                 key={index}
                              >
                                 <span className="opacity-50 mr-2">{index ? ", " : ""}</span>
                                 <span className="font-medium opacity-50 cursor-pointer hover:opacity-100">{item || "-"} </span>
                              </div>
                           ))
                     }
                  </div>
               </div>
            </div>

            <footer
               className="flex gap-12 items-center text-white-500 font-semibold pb-2 mb-4 border-b-black-200"
            >
               <div
                  onClick={() => playMusic(musics, 0)}
                  className="flex gap-2 text-white cursor-pointer py-1.5 px-4 rounded-full bg-black-200 hover:bg-black-300 active:bg-black-150 transition-[background_0.2s_ease]"
               >
                  <Play />
                  <span>Reproduzir</span>
               </div>

               <div>{formatDuration(R.reduce(calcTimeTotalAlbum, 0, musics))} min</div>

               <div>{musics.length} músicas</div>

               <div>Avaliacão {Number(R.mean(R.map(music => music.reated, musics)).toFixed(2)) * 2}</div>
            </footer>
         </header>

         <ListMusics
            items={musics}
            reateMusic={reateMusic}
         />
      </section>
   )
}