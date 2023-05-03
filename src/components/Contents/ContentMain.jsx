import { useState, useEffect, useContext } from "react";
import { RouteContext } from "../Contexts/RouteContext";
import { getContent } from "./RouteContent";

export function ContentMain() {
   const { route } = useContext(RouteContext);
   const [content, setContent] = useState(null);

   useEffect(() => {
      if (route.path === "album" || route.id) {
         const section = getContent(route);
         setContent(section)
      }


      // return () => {
      //    setContent(null)
      // }
   }, [route])

   return (
      <div className="w-full">
         {content}
      </div>
   )
}

