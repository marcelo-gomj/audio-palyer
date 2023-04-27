import { useState, useContext } from "react";
import { RouteContext } from "../Contexts/RouteContext";
import { prisma } from "../../services/prisma.js"

import Arrow from "../assets/arrow.svg";

export function CategoryItem({ children, path, items, unique }) {
   const [subCategory, setSubCategory] = useState(false);
   const [subItems, setSubItems] = useState([]);
   const { setRoute, route } = useContext(RouteContext);

   async function fetchSubList(path) {
      const res = await prisma.albums.findMany(
         {
            distinct: [path],
            select: {
               [path]: true,
            },
            orderBy: {
               artist: "asc"
            }
         }
      )

      setSubItems(
         res
      )

   }


   return (
      <>
         <div
            className={`flex group ${path === route ? "text-white" : "text-white-800"} sticky top-0 py-4 cursor-pointer bg-black-80 px-1 items-center gap-6 text-base ml-5 text-opacity-80 z-50`}
            style={path === route ? { color: "white" } : {}}
            onClick={() => {
               setSubCategory(!subCategory);
               setRoute(path);
               if (path !== route) fetchSubList(path);
            }}
         >
            {children}
            {unique ?
               null
               :
               <Arrow
                  className={`absolute right-5 w-5 ${subCategory && "rotate-90"} opacity-80 group-hover:opacity-100`}
               />
            }
         </div>

         {unique ?
            null
            :
            (
               <ul
                  className={`${subCategory ? "block" : "hidden"} my-4 ml-8`}
               >
                  {subItems.map((item, index) => (
                     <li
                        className="py-2 text-[0.94rem] text-white-500 cursor-pointer hover:text-white transition-colors ease-linear duration-150"
                        key={item[path]}
                     >
                        {item[path] || "Desconhecido"}
                     </li>
                  ))}
               </ul>
            )}
      </>
   )
}