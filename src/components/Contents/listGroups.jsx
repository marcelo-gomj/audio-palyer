import React, { useCallback, useEffect, useState, useRef } from "react";

import { join, split, or, nth, replace, juxt, memoizeWith, ifElse } from "ramda";
import { VariableSizeList } from "react-window"

import { Image } from "../ImageMeta";

import albums from "./list.module.css";

export function ListGroups({ list }) {
   const [width, setWidth] = useState(0)
   const cont = useRef(null);

   useEffect(() => {
      setWidth(cont?.current?.clientWidth || 0)
   }, [cont.current]);

   const checkAlbum = memoizeWith(String, (index) => {
      const music = list[index];
      const paths = split("/");
      const prev = list[index - 1];

      const [musicDefault, albumDefault] = juxt([nth(-1), nth(-2)])(paths(music.path));
      const albumName = or(music.album, albumDefault);
      const hasHeader = albumName !== or(prev?.album, nth(-2, paths(prev?.path || "")));

      return {
         music,
         hasHeader,
         musicDefault,
         albumName
      }
   })

   const Row = ({ index, style }) => {
      const {
         music,
         hasHeader,
         musicDefault,
         albumName
      } = checkAlbum(index);

      const segunds = replace(
         ".", ":",
         (or(music.format.duration, 0) / 60).toFixed(2)
      )

      const track = or(music.track.no, "-")

      return (
         <div style={style} className={albums["album"]}>
            {
               hasHeader &&
               <div
                  className={albums["album-header"]}
               >
                  {
                     <Image hasAlbum={music?.album} path={music.path} />
                  }

                  <div className={albums["album-details"]}>
                     <div className={albums["album-details-top"]}>
                        <h2>{albumName}</h2>
                        <h3>{music?.artist}</h3>
                     </div>

                     <div className={albums["album-details-bottom"]}>
                        {(music?.year ? music?.year + " - " : "") + join(", ", [music?.genre])}
                     </div>
                  </div>
               </div>
            }

            {/* <div style={{ margin: ".6rem 0", position: "relative" }}>
               <li
                  className={albums["item-music"]}
               >

                  <span>{track}</span> {or(music.title, musicDefault)} <span>{segunds}</span>

               </li>
            </div> */}

         </div>
      )
   }

   const getSiteItem = (index) => {
      const { hasHeader } = checkAlbum(index);

      // return hasHeader ? (254 + 44) : 44;
      return hasHeader ? 150 : 0;

   }

   return (
      <div ref={cont} 
         className={albums["albums-container"]}
         style={{ marginLeft: "2.5rem", width: "calc(100% - 3rem)", height: "800px" }}>
         <VariableSizeList
            width={"100%"}
            height={800}
            itemCount={list.length}
            itemSize={getSiteItem}
         >
            {Row}
         </VariableSizeList>

      </div>
   )
}