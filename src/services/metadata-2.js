import { readdir, stat } from 'fs';
import { promisify } from 'util';
import { parseFile } from 'music-metadata';
import { prisma } from "./prisma.js";

import * as R from "ramda";

const statAsync = promisify(stat);
const readDirAsync = promisify(readdir);

const absolutePath = (base, path) => `${base}/${path}`;

const createEntry = ({ format, common }, path) => {
   const remove = [
      "bpm", "movementIndex", "isrc",
      "barcode", "albumartist", "picture"
   ]

   const includeFormat = [
      "numberOfChannels", "bitrate", "duration", "container"
   ];

   return {
      ...R.omit(remove, common),
      format: R.pick(includeFormat, format),
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

         folderSources.push(...R.map(
            element => absolutePath(path, element),
            subElements
         ))
      }
   }

   if (!R.isEmpty(folderSources)) {
      let files = [];
      let folders = [];

      for (let element of folderSources) {
         const elementDetail = await statAsync(element);

         if (elementDetail.isDirectory()) {
            folders.push(element);
         }

         if (elementDetail.isFile() && R.test(/\.mp3$/i, element)) {
            files.push(element)
         }
      }

      if (R.length(folders)) {
         for (let folder of folders) {
            const subPathElements = await readDirAsync(folder);

            for (let element of subPathElements) {
               const pathFile = absolutePath(folder, element);
               const subElemDetail = await statAsync(pathFile);

               if (subElemDetail.isFile() && R.test(/\.mp3$/i, element)) {
                  files.push(pathFile)
               }
            }
         }
      }

      let counter = 0;
      const len = files.length;
      const metadatas = [];

      for (let file of files) {
         counter++;

         console.log(counter + " de " + len);

         const {
            common: {
               album, title, artist, genre,
               label, track, year
            },
            format: { duration }
         } = await parseFile(file);

         metadatas.push(
            prisma.albums.create({
               data: {
                  title: title || null,
                  artist: artist || null,
                  album: album || null,
                  genre: genre?.[0] || null,
                  label: label?.[0] || null,
                  track: track?.no || null,
                  year: year || null,
                  folder: R.compose(R.join(""), R.init)(R.split("/", file)),
                  path: file,
                  played: 0,
                  reated: 0,
                  lyrics: null,
                  duration: duration
               }
            })
         )

         console.clear()
      }

      await prisma.$transaction(metadatas);
   }

   return;
}

verifyFoldersAndSubfolders(["D:\\Música\\"])