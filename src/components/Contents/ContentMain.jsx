import { useState, useEffect, useContext } from "react";
import { createDatabase, read, count, albums } from "../../services/database.js";
import { RouteContext } from "../Contexts/RouteContext";
import { ListGroups } from "./listGroups.jsx";
import { ListAlbums } from "./list.jsx"
import styles from "./content.module.css";

export function ContentMain() {
   const { route } = useContext(RouteContext);
   const [content, setContent] = useState(null)

   useEffect(() => {
      getContent(route).then(data => {
         setContent(data)
      })
   }, [route])

   return (
      <div className={styles["content"]}>
         { content }
      </div>
   )
}

async function getContent(route) {
   switch (route) {
      case "":
         return <div style={{ color: "white" }}>INICIO DO CONTENT</div>;
      case "albums":
         // return <div>ALBUMS</div>
         return createDatabase("albums")
            .then(database => database(albums))
            .then(list => <ListAlbums list={list} />)

      case "search":
         return <div style={{ color: "white" }}>SEARCH</div>;

      case "generes":
         return <div style={{ color: "white" }}>GENERS</div>;

      default:
         return <div style={{ color: "white" }}>NOT CONTENT</div>;
   }
}
