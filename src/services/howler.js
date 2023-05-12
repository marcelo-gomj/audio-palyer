import { Howl } from "howler";
import { store } from "./electronStore";

const createHowler = (path) => {
   const howl = new Howl({
      src: path,
      html5: true,
      volume: store.get("volume"),
   });

   howl.play();

   return (fn, ...params) => {
      return fn(howl, ...params)
   };
}

const nextMusic = (howl, { musics, current }, next) => {
   howl.unload();

   const listLength = musics.length - 1;

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


const controlVolume = (howl, volume) => {
   if (volume) {
      howl.volume(volume);
      store.set("volume", volume);
   }

   return store.get("volume");
}

const progressDuration = (howl, pos) => {
   if (pos) howl.seek(pos);

   return howl.seek();
}

const playPauseMusic = (howl) => {
   if (howl.playing()) {
      howl.pause()
   } else {
      howl.play()
   }
}

const controllLoop = (howl, isLoop) => {
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