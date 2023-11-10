import { Howl } from "howler";
import { store } from "./electronStore";
import { AlbumsDatabase } from "../types/database";

type nextContext = {
   musics: AlbumsDatabase,
   current: number | null,
}

const createHowler = (path: string) => {
   const howl = new Howl({
      src: path,
      html5: true,
      volume: store.get("volume"),
   });

   howl.play();

   return (fn: ((arg0: Howl, ...params: any[]) => void), ...params: any[]) => {
      return fn(howl, ...params)
   };

   // return (fn: any, ...params: Parameters<any>) => {
   //    return fn(howl, ...params)
   // };
}

const nextMusic = (
   howl: Howl, { musics, current }: nextContext,
   next?: boolean
) => {
   howl.unload();

   const listLength = musics.length - 1;

   if (current === null) return;

   if (store.get("shuffle")) {
      const randomMusic = Math.floor(Math.random() * listLength);

      return randomMusic === current ? (randomMusic + 1) : randomMusic;
   }

   const prevMusic = next ? (current + 1) : (current - 1);

   if (prevMusic > listLength || prevMusic < 0) {
      if (store.get("loop") === undefined) {

         if (prevMusic > listLength) return 0;

         if (prevMusic < 0) return listLength;
      }
   };

   return prevMusic;
}


const controlVolume = (howl: Howl, volume: number) => {
   if (volume) {
      howl.volume(volume);
      store.set("volume", volume);
   }

   return store.get("volume");
}

const progressDuration = (howl: Howl, pos: number) => {
   if (pos) howl.seek(pos);

   return howl.seek();
}

const playPauseMusic = (howl: Howl) => {
   if (howl.playing()) {
      howl.pause()
   } else {
      howl.play()
   }
}

const controllLoop = (howl: Howl, isLoop: undefined | boolean) => {
   if (isLoop) {
      howl.loop(isLoop === undefined ? false : isLoop);
      store.set("loop", isLoop);
   }

   return store.get("loop");
}

export {
   createHowler,
   controlVolume,
   progressDuration,
   nextMusic,
   playPauseMusic,
   controllLoop
}