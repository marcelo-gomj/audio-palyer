import { useState, useContext } from "react";
import { RouteContext } from "../Contexts/RouteContext";
import { prisma } from "../../services/prisma.js"

import Arrow from "../assets/arrow.svg";

export function CategoryItem({ children, path, items, unique }) {
   const [subCategory, setSubCategory] = useState(false);
   const [subItems, setSubItems] = useState([]);
   const { setRoute, route } = useContext(RouteContext);

   async function fetchSubList(path) {
      const res = await prisma.albums.findMany({
         distinct: [path],
         select: {
            [path]: true,
         },
         orderBy: {
            [path]: "asc"
         }
      })

      setSubItems(
         res
      )

   }

   const activePath = path === route.path;

   return (
      <>
         <div
            className={`flex group  ${activePath ? "text-white" : "text-white-400"} sticky top-0 py-[0.85rem] cursor-pointer bg-black-80 px-2 items-center gap-6 text-base ml-5 text-opacity-80 z-50`}
            onClick={() => {
               if (path !== route.path) {
                  if (!unique) fetchSubList(path);

                  setRoute({ path });
               }

               setSubCategory(!subCategory);
            }}
         >
            {children}
            {unique ?
               null
               :
               <Arrow
                  className={`absolute right-5 w-5 ${subCategory && "rotate-90"} ${!activePath && "opacity-75"}  group-hover:opacity-100`}
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
                        className={`py-2 pr-4  ${(route.id === item[path]) ? "opacity-100 font-medium" : "opacity-60"} text-sm cursor-pointer hover:opacity-100 transition-opacity ease-linear duration-100`}
                        key={item[path]}
                        onClick={() => {
                           setRoute({ path, id: item[path] });
                        }}
                     >
                        {item[path] || "Desconhecido"}
                     </li>
                  ))}
               </ul>
            )}
      </>
   )
}