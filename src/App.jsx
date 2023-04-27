// const { query } = require('../src/util');
// const { addFolders, modalSelectLibrary, listFoldersItems } = require("../src/ui/add-library-folders");
// const { createDatabase, read, write } = require("../src/database");
// const { config } = require("../src/config");
// const { isEmpty } = require('ramda');
// const solid = require("solid-js")
import React, { useEffect } from "react";
import { Layout } from "./components/Layout";
import "./index.css";

const App = () => {

  return (
      <React.StrictMode>
         <Layout />
      </React.StrictMode>
  )
}

export default App


// const listenCategoryClick = (category, index) => {
//    const arrow = query(".with-subcategory img")[index];
//    const subCategory = query(".sub-category")[index];

//    category.addEventListener("click", () => {
//       arrow.classNameList.toggle("opened-category");
//       subCategory.classNameList.toggle("open-sub-category");
//    })
// }

// const showContent = (container) => {
//    const contentElement = query(container);
//    return (append) => {
//       contentElement.innerHTML = "";
//       append(contentElement)
//    }
// }

// const setContent = showContent(".content");
// // modalSelectLibrary(query(".content"))


// const listAlbumsContent = () => {
//    const { paths } = config("sources") || {}; 
   
//    // if(!paths || isEmpty(paths)){
//       setContent(modalSelectLibrary)

//       return;
//    // }
// }

// query(".with-subcategory").map( listenCategoryClick );
// query("#albums-category").addEventListener("click", listAlbumsContent );