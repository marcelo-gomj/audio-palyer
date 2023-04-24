import { useEffect, useRef, useState } from "react";
// import { imageBuffer } from "../util/util.js";
const { parseNodeStream } = require("music-metadata-browser");
const { createReadStream } = require("fs");

import DiscDefault from "./assets/disc.svg";

export function Image({ path, hasAlbum }) {
   const [loaded, setLoaded] = useState(null);
   const imgRef = useRef(null);

   useEffect(() => {
      async function reduceImage(path) {
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
      }, { threshold: 0, delay: 100 });

      observer.observe(imgRef.current)

      return () => {
         observer.disconnect();
      };
   }, [])


   return (
      !loaded ?
         <div
            ref={imgRef}
            style={{
               display: "flex", alignItems: "center", justifyContent: "center",
               minWidth: "7.5rem", height: "7.5rem",
               background: "rgb(15, 15, 15)", borderRadius: "6px",
            }}>
            {loaded === undefined && <DiscDefault style={{ opacity: 0.4, width: "85px", height: "85px" }} />}
         </div>

         :

         <img
            // loading="lazy"
            src={`data:${loaded.format};base64,${loaded.buffer.toString("base64")}`}
         />
   )
}