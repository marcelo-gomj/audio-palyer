// import Datastore from 'nedb';
// import { promisify } from "util";
// import path from "path";
// // import { ipcRenderer } from 'electron';

const Datastore = require('nedb');
const { promisify } = require("util");
const path = require("path");

import { bind, curry, apply } from 'ramda';

export const createDatabase = async (file) => {
   // const appData = await ipcRenderer.invoke('get-user-data-path');
   // const pathDb = path.join(appData, "datastore", `${file}.db`);
   const pathDb = path.join("./datastore", `${file}.db`);

   const db = new Datastore({ 
      filename: pathDb, 
      autoload: true
   });

   return (callback, ...params) => apply(callback(db), params);
}

const promesifyMethodDb = curry(
   ( method, database ) => bind(promisify(database[method]), database)
)

export const read = promesifyMethodDb("find");
export const write = promesifyMethodDb("insert");
export const count = promesifyMethodDb("count");
export const albums = (database) => {
   const protoSort = database.find({}).sort({ album: 1, "track.no" : 1, "path": 1 });
   
   return bind(
      promisify(protoSort.exec), 
      protoSort
   );
}

