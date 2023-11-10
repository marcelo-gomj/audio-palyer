import React, { useState, useEffect, useContext } from "react";
import { RouteContext } from "../Contexts/RouteContext";
import { getContent } from "./RouteContent";

export function ContentMain() {
   const { route } = useContext(RouteContext);
   const [content, setContent] = useState<any>(null);

   useEffect(() => {
      if (route.path === "album" || route.path === "search" || route.id) {
         const section = getContent(route);
         setContent(section)
      }

   }, [route])

   return (
      <div className="w-full">
         {content}
      </div>
   )
}

