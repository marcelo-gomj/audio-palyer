const Datastore = require('nedb');

const createDatabase = (file) => {
   const pathDb = `${file}.db`;
   const db = new Datastore({ fileName: pathDb });
   
   return ( callback, ...params) => {
      db.loadDatabase((err) => {
         if(err) console.log("ERRO AO CARREGAR DATABASE", err);
         
         callback(db, ...params);
      });
   }
}

const read = (database, query, callback) => {
   database.find(query, (err, res) => {
      if(err) console.log("ERRO INSERT DATA", err);

      callback(res);
   });
};

const write = (database, data, callback) => {
   database.insert(data, (err, res) => {
      if(err) console.log("ERRO INSERT DATA", err);

      callback(res);
   });
};

module.exports = {
   createDatabase,
   read,
   write
}