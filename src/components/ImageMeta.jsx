import { useEffect, useState, useRef } from "react";
import { imageBuffer } from "../util/util.js";

export function Image({ path }) {
   const [loaded, setLoaded] = useState(null);
   const imgRef = useRef(null);

   useEffect(() => {
      async function getBuffer() {
         const buffer = await imageBuffer(path)
         setLoaded(buffer)
      }

      const observer = new IntersectionObserver(([entry]) => {
         if (entry.isIntersecting) {
            getBuffer()
            observer.disconnect();
         }
      }, { threshold: 0.5, delay: 0 });

      observer.observe(imgRef.current)

      return () => {
         observer.disconnect();
      };
   }, [path])

   if (!loaded) {
      return (
         <div ref={imgRef} style={{
            width: "90px", heigth: "90px",
            background: "rgb(15, 15, 15)", borderRadius: "4px",
            // border: "2px solid rgb(20, 20, 20)"
         }}></div>
      )
   }

   const base64 = loaded.buffer.toString('base64');

   return <img
      loading={"lazy"}
      src={`data:${loaded.type};base64,${base64}`}
   />
}