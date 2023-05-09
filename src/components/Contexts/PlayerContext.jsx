import { createContext, useEffect, useState } from "react";
import { createHowler, nextMusic } from "../../services/howler";
export const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
   const [handleHowl, setHandleHowl] = useState(null);
   const [musicContext, setMusicContext] = useState({
      musics: [],
      current: null
   });

   const playMusic = (musics, current) => {
      setMusicContext({
         musics,
         current
      });
   }

   const handleNextMusic = (buttonNext) => {
      const indexMusic = handleHowl(nextMusic, musicContext, buttonNext)

      if (indexMusic !== undefined) {
         playMusic(musicContext.musics, indexMusic);
      }
   }

   useEffect(() => {
      if (musicContext.current === null) return;

      const { current, musics } = musicContext;
      const howlGlobal = createHowler(musics[current].path);

      howlGlobal(howl => {
         howl.on("end", () => {
            const count = nextMusic(howl, musicContext, true);
            if (count === undefined) return;
            playMusic(musics, count)
         })
      })

      setHandleHowl(() => howlGlobal)

      return () => {
         howlGlobal(howl => howl.unload())
      }

   }, [musicContext])



   return (
      <PlayerContext.Provider value={{
         currentMusic: musicContext.musics[musicContext.current] || null,
         handleNextMusic,
         handleHowl,
         playMusic
      }}>
         {children}
      </PlayerContext.Provider>
   )
}