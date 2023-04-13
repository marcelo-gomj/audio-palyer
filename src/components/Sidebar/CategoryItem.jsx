import { useState, useContext } from "react";
import { RouteContext } from "../Contexts/RouteContext";
import { lib } from "./lib";

import sidebar from "./sidebar.module.css";
import Arrow from "../assets/arrow.svg";

function Category({ children, path, items, unique }) {
   const [subCategory, setSubCategory] = useState(false);
   const [subItems, setSubItems] = useState([]);
   const { setRoute, route } = useContext(RouteContext);

   function fetchSubList( path ){
      setSubItems(lib[path] || ["sem conteúdo"])
   }

   return (
      <>
         <div className={sidebar["category-item"]}
            style={path === route ? { color: "white" } : {}}
            onClick={() => {
               setSubCategory(!subCategory);
               setRoute(path);
               fetchSubList(path);
            }}
         >
            { children }
            { unique ? null : 
               <Arrow className={subCategory ? sidebar["opened-category"] : ""} /> 
            }
         </div>

         { unique ? null : (
            <ul 
               className={`${sidebar["sub-category"]} ${subCategory ? sidebar["open-sub-category"] : ""}`}
            >
               { subItems.map( (item, index) => <li key={index}>{item}</li> ) }
            </ul>
         )}
      </>
   )
}

export function CategoryItem(props){
   return (
      props?.unique ?
      
      <Category {...props} />

      :

      <div className={sidebar["category-container"]}>
         <Category {...props} />
      </div> 
   )
}