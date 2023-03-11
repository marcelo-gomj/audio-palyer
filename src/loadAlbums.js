const { 
   map, filter, test, omit, length, partition, reduce
} = require('ramda');
const { readdir, stat, createReadStream } = require('fs');
const promesify = require('util').promisify;
const { parseNodeStream } = require('music-metadata-browser');

const statAsync = promesify(stat);
const readDirAsync = promesify(readdir);

const verifyFoldersAndSubfolders = async (path, deep = true) => {
   const folderElements = await readDirAsync(path);
   
   if(length(folderElements)){
      let files = [];
      let folders = []; 

      for(let elements of folderElements){
         const pathTotal = `${path}/${elements}`;
         const detail = await statAsync(pathTotal);

         if(detail.isDirectory()){
            folders.push(pathTotal);
         }
         
         if(detail.isFile() && test(/\.mp3$/i, pathTotal)){
            const { common, format } = await parseNodeStream(createReadStream(pathTotal));

            files.push({ common, format });
         } 
      }

      if(length(folders)){
         for(let folderPath of folders){
            const subPathElements = await readDirAsync(folderPath);

            for(let elements of subPathElements){
               const subPath = `${folderPath}/${elements}`;
               const subElemDetail = await statAsync(subPath);

               if(subElemDetail.isFile() && test(/\.mp3$/i, subPath)){
                  const stream = createReadStream(subPath);
                  const { common, format } = await parseNodeStream( stream );
                  
                  files.push({ common, format });
               } 
            }
         }
      }

      return files;
   }

   return;
}

const loadAlbums = async (path = 'D:/Música') => {
   return await verifyFoldersAndSubfolders(path);
}


module.exports = {
   loadAlbums
};