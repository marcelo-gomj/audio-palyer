import React, { createContext, useEffect, useState } from "react";
import { createHowler, nextMusic } from "../../services/howler";
import { Howl } from "howler";
import { AlbumDatabase, AlbumsDatabase } from "../../types/database";

type PlayerContextProps = {
   children: React.ReactNode
}

type HowlState = null | ((...args: any[]) => any);

type PlayerContextType = {
   currentMusic: AlbumDatabase | null,
   handleNextMusic: (buttonNext?: boolean) => void,
   handleHowl: HowlState,
   playMusic: (musics: AlbumsDatabase, current: number) => void
}

type MusicStateContext = {
   musics: AlbumsDatabase | [],
   current: number | null
}


export const PlayerContext = createContext<PlayerContextType>({} as PlayerContextType);

export function PlayerProvider({ children }: PlayerContextProps) {
   const [handleHowl, setHandleHowl] = useState<HowlState>(null);
   const [musicContext, setMusicContext] = useState<MusicStateContext>({
      musics: [],
      current: null
   });

   const playMusic = (musics: AlbumsDatabase, current: number) => {
      setMusicContext({
         musics,
         current
      });
   }

   const handleNextMusic = (buttonNext?: boolean) => {
      if (handleHowl === null) return;

      const indexMusic = handleHowl(nextMusic, musicContext, buttonNext)

      if (indexMusic !== undefined) {
         playMusic(musicContext.musics, indexMusic);
      }
   }

   useEffect(() => {
      if (musicContext.current === null) return;

      const { current, musics } = musicContext;
      const howlGlobal = createHowler(musics[current].path);

      howlGlobal((howl: Howl) => {
         howl.on("end", () => {
            if (musicContext.current === null) return;

            const count = nextMusic(howl, musicContext, true);
            if (count === undefined) return;
            playMusic(musics, count)
         })
      })

      setHandleHowl(() => howlGlobal)

      return () => {
         howlGlobal((howl: Howl) => howl.unload())
      }

   }, [musicContext])

   const currentMusic = musicContext.current !== null ? musicContext.musics[musicContext?.current] : null;

   return (
      <PlayerContext.Provider value={{
         currentMusic,
         handleNextMusic,
         handleHowl,
         playMusic
      }}>
         {children}
      </PlayerContext.Provider>
   )
}