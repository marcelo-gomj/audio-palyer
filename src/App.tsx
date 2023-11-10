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
