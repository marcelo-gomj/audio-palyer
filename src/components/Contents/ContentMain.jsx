import { useState, useEffect, useContext } from "react";
import { RouteContext } from "../Contexts/RouteContext";
import { getContent } from "./RouteContent";

export function ContentMain() {
   const { route } = useContext(RouteContext);
   const [content, setContent] = useState(null);

   useEffect(() => {
      const section = getContent(route);

      console.log(section)
      if (section) setContent(section)

      return () => {
         setContent(null)
      }
   }, [route])

   return (
      <div
         className="relative w-full"
      >
         {content}
      </div>
   )
}

