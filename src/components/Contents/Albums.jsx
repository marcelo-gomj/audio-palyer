import { prisma } from "../../services/prisma";
import { useContext, useEffect, useState } from "react";

import { FixedSizeList } from "react-window";
import { Image } from "../ImageMeta";
import { RouteContext } from "../Contexts/RouteContext";

import {
   split, splitEvery, nth, __
} from "ramda";

import SearchIcon from "../assets/search.svg";
import styles from "./fix.module.css";

export function ListAlbums({ list, path }) {
   const [albumsList, setAlbumsList] = useState([]);

   async function queryAlbumsGroup() {
      const queryAlbums = await prisma.albums.findMany({
         distinct: [path],
         select: {
            album: true, title: true, path: true, artist: true, year: true
         },
         orderBy: {
            album: "asc"
         }
      })

      setAlbumsList(queryAlbums)
   }

   useEffect(() => {
      queryAlbumsGroup()
   }, []);

   if (!albumsList.length) {
      return ""
   }


   const albums = splitEvery(3, albumsList);
   const { route, setRoute } = useContext(RouteContext);

   const row = ({ style, index }) => {
      const musics = albums[index];


      return (
         <div
            style={style}
            className="flex justify-between w-full px-8 pt-4"
            // className={styles["albums-row"]}
            key={musics?.[0].id}
         >
            {
               musics.map((music, index) => {
                  let albumName = music?.album || nth(-2, split("/", music.path));

                  if (albumName.length > 40) {
                     albumName = albumName.slice(0, 40) + "..."
                  }

                  return (
                     <div
                        className="group cursor-pointer flex flex-col items-center w-1/4 h-full rounded-md gap-6"
                        // className={styles["album-item"]}
                        key={index}
                        onClick={() => {
                           setRoute({
                              path: "album",
                              id: music.album
                           })
                        }}
                     >

                        <Image path={music.path} len={"w-[7.5rem] h-[7.5rem]"} />

                        <div
                           className="text-center"
                        >
                           <h3 className="text-medium text-white-950 pb-1">{albumName}</h3>

                           <p
                              className="inline text-sm text-white-400 hover:text-white"
                           >{
                                 (music?.artist || "")
                              }</p>
                           <span className="text-sm text-white-400">{music?.year ? " - " + music?.year : ""}</span>
                        </div>
                     </div>
                  )
               })
            }
         </div>
      )
   }

   return (
      <div
         className="relative h-full "
      // className={styles["list-container"]}
      >
         <div
            className="flex bg-black-80 absolute w-full justify-between items-center h-12 top-0 left-0 px-8 py-2 z-50"
         // className={styles["header-list"]}
         >
            <div
               className="flex items-center w-3/5 h-full gap-6"
            >
               <SearchIcon className="opacity-75" />
               <input
                  className="bg-opacity focus:outline-none"
                  type="text"
                  placeholder="Buscar albums"
               />
            </div>
            <p>Ordem Alfabetica</p>
         </div>

         <div
            className={styles["fix-height"]}
         >
            <FixedSizeList
               width={"100%"}
               height={1000}
               itemCount={albums.length}
               itemSize={300}
            >{
                  row
               }</FixedSizeList>
         </div>
      </div>
   )
}