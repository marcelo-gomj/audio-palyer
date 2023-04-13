import { useEffect, useState, useRef } from "react";
import { imageBuffer } from "../util/util.js";

import DiscDefault from "./assets/disc.svg";

export function Image({ path, hasAlbum }) {
   const [loaded, setLoaded] = useState(null);
   const imgRef = useRef(null);

   useEffect(() => {
      async function getBuffer() {
         const resBuffer = await imageBuffer(path);
         
         if(resBuffer?.buffer){
            const { format, buffer } = resBuffer;

            setLoaded({
               buffer: buffer.toString('base64'),
               format
            })
         }
      }

      const observer = new IntersectionObserver(([entry]) => {
         if (entry.isIntersecting) {
            getBuffer()
            observer.disconnect();
         }
      }, { threshold: 0, delay: 0 });

      observer.observe(imgRef.current)

      return () => {
         observer.disconnect();
      };
   }, [path])

   if (!loaded) {
      return (
         <div ref={imgRef} style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            minWidth: "7.5rem", height: "7.5rem",
            background: "rgb(15, 15, 15)", borderRadius: "6px",
         }}>
            {!hasAlbum && <DiscDefault style={{ opacity: 0.4, width: "85px", height: "85px" }}/>}
         </div>
      )
   }

   return <img
      loading={"lazy"}
      src={`data:${loaded.format};base64,${loaded.buffer}`}
   />
}