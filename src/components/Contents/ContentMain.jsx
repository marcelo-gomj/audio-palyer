import { useState, useEffect, useContext } from "react";
import { RouteContext } from "../Contexts/RouteContext";
import { ListAlbums } from "./Albums.jsx"
import { prisma } from "../../services/prisma.js";

export function ContentMain() {
   const { route } = useContext(RouteContext);
   const [content, setContent] = useState(null);

   useEffect(() => {
      getContent(route).then(data => {
         setContent(data)
      })
   }, [route])

   return (
      <div
         className="relative w-full"
      >
         {content}
      </div>
   )
}

async function getContent(route) {
   switch (route.path) {
      case "":
         return <div style={{ color: "white" }}>INICIO DO CONTENT</div>;
      case "albums":
         return prisma.albums.findMany({
            distinct: ["album"],
            select: {
               album: true,
               title: true,
               path: true,
               artist: true,
               year: true,
            }
         }).then(list => <ListAlbums list={list} />)

      case "search":
         return <div style={{ color: "white" }}>SEARCH</div>;

      case "generes":
         return <div style={{ color: "white" }}>GENERS</div>;

      default:
         return <div style={{ color: "white" }}>NOT CONTENT</div>;
   }
}
