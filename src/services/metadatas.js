// import { readdir, stat, createReadStream } from 'fs';
// import { promisify } from 'util';
// import { parseStream, parseFile, selectCover } from 'music-metadata';
// import { createDatabase, write, list } from "./database.js";

const { readdir, stat, createReadStream } = require('fs');
const { promisify } = require('util');
import { parseStream, parseFile, selectCover } from 'music-metadata';
// import { createDatabase, write, list } from "./database.js";

import {
   map, test, omit, length, pick, isEmpty, toPairs
} from 'ramda';

const statAsync = promisify(stat);
const readDirAsync = promisify(readdir);

const absolutePath = (base, path) => `${base}/${path}`;

const metadataSchema = ({ format, common }, path) => {
   const remove = [
      "bpm", "movementIndex", "isrc",
      "barcode", "albumartist", "picture"
   ]

   const includeFormat = [
      "numberOfChannels", "bitrate", "duration", "container"
   ];

   return {
      ...omit(remove, common),
      format: pick(includeFormat, format),
      played: 0,
      reated: 0,
      path
   }
}

const verifyFoldersAndSubfolders = async (paths) => {
   const folderSources = [];

   for (let path of paths) {
      const sourceDetail = await statAsync(path);

      if (sourceDetail.isDirectory()) {
         const subElements = await readDirAsync(path);

         folderSources.push(...map(
            element => absolutePath(path, element),
            subElements
         ))
      }
   }

   if (!isEmpty(folderSources)) {
      let files = [];
      let folders = [];

      for (let element of folderSources) {
         const elementDetail = await statAsync(element);

         if (elementDetail.isDirectory()) {
            folders.push(element);
         }

         if (elementDetail.isFile() && test(/\.mp3$/i, element)) {
            files.push(element)
         }
      }

      if (length(folders)) {
         for (let folder of folders) {
            const subPathElements = await readDirAsync(folder);

            for (let element of subPathElements) {
               const pathFile = absolutePath(folder, element);
               const subElemDetail = await statAsync(pathFile);

               if (subElemDetail.isFile() && test(/\.mp3$/i, element)) {
                  files.push(pathFile)
               }
            }
         }
      }

      const albums = await createDatabase("albums");

      let counter = 0;
      const len = files.length;
      for (let file of files) {
         counter++;
         console.log(counter + " de " + len);

         const metadatas = await parseFile(file);

         albums(
            write,
            metadataSchema(metadatas, file)
         );

         console.clear()
      }

   }

   return;
}