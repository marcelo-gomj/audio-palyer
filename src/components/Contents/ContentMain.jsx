import { useState, useEffect, useCallback } from "react";
import { createDatabase, read, count, albums } from "../../services/database.js";

import { ListGroups } from "./listGroups.jsx";

export function ContentMain({ category }) {
   const [list, setList] = useState([]);

   useEffect(() => {
      (async () => {
         if (category === "albums") {
            const database = await createDatabase("albums");
            const data = await database(albums);
            setList(data);
         }

      })()

   }, [category]);

   const generateContent = (category) => {
      if (category === "albums") {
         return (
            <ListGroups list={list} /> 
         )
      }

      return [];
   }

   return (
      <div className="content">
         {
            generateContent(category)
         }
      </div>
   )
}