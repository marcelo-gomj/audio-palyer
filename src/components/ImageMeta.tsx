import { useEffect, useRef, useState } from "react";
// import { imageBuffer } from "../util/util.js";
const { Buffer } = require("buffer");
const { parseNodeStream } = require("music-metadata-browser");
const { createReadStream } = require("fs");

import DiscDefault from "./assets/disc.svg";

type ImageProps = {
   path: string,
   len: string,
   hasAlbum?: boolean
}

type loadedState = {
   buffer: Buffer,
   format: any
} | null | undefined;

export function Image({ path, len, hasAlbum }: ImageProps) {
   const [loaded, setLoaded] = useState<loadedState>(null);
   const imgRef = useRef<any>(null);

   useEffect(() => {
      async function reduceImage(path: string) {
         const { common: { picture } } = await parseNodeStream(createReadStream(path));
         const buffer = picture?.[0].data;
         const format = picture?.[0].format;

         if (buffer) {
            setLoaded({
               buffer,
               format
            })
         }

         if (!picture) {
            setLoaded(undefined)
         }
      }


      const observer = new IntersectionObserver(([entry]) => {
         if (entry.isIntersecting) {
            reduceImage(path)
            observer.disconnect();
         }
      }, { threshold: 0 });

      try {
         observer.observe(imgRef.current)
      } catch (error) {

      }

      return () => {
         observer.disconnect();
      };
   }, [path])


   return (
      <div
         ref={imgRef}
         style={{ animation: "opacity-animation 6s ease 6s" }}
         className={`flex ${len} bg-15 items-center justify-center rounded-md overflow-hidden outline outline-offset-4 outline-2 outline-opacity group-hover:outline-white`}
      >{
            !loaded ?

               loaded === undefined ?
                  <DiscDefault className="opacity-30 w-20 h-20" /> : null
               :

               <img
                  className={`${len} animate-[opacityAnimation_0.15s_ease]`}
                  src={`data:${loaded?.format};base64,${loaded.buffer.toString("base64")}`}
               />
         }</div>
   )
}