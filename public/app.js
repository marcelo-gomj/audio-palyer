// const { query } = require('../src/util');
// const { addFolders, modalSelectLibrary, listFoldersItems } = require("../src/ui/add-library-folders");
// const { createDatabase, read, write } = require("../src/database");
// const { config } = require("../src/config");
// const { isEmpty } = require('ramda');
// const solid = require("solid-js")
import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  return <h1>Hello, world!</h1>
}

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)


// const listenCategoryClick = (category, index) => {
//    const arrow = query(".with-subcategory img")[index];
//    const subCategory = query(".sub-category")[index];

//    category.addEventListener("click", () => {
//       arrow.classList.toggle("opened-category");
//       subCategory.classList.toggle("open-sub-category");
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