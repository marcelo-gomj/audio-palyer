const Datastore = require('nedb');
const { promisify } = require("util");
const path = require("path");
const { ipcRenderer } = require('electron');
const { bind, curry, apply } = require('ramda');

const createDatabase = async (file) => {
   const appData = await ipcRenderer.invoke('get-user-data-path');
   const pathDb = path.join(appData, "datastore", `${file}.db`);

   const db = new Datastore({ 
      filename: pathDb, 
      autoload: true
   });

   return (callback, ...params) => apply(callback(db), params);
}

const promesifyMethodDb = curry(
   ( method, database ) => bind(promisify(database[method]), database)
)

const read = promesifyMethodDb("find");
const write = promesifyMethodDb("insert");
const count = promesifyMethodDb("count");

module.exports = {
   createDatabase,
   read,
   write,
   count
}