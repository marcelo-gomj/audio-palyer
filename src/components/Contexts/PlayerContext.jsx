import { createContext, useEffect, useState } from "react";
import { createHowler } from "../../services/howler";
import { ListMusics } from "../Contents/Album/listMusics";
export const PlayerContext = createContext(null);

const musics = [
   {
      "id": 439,
      "title": "Tudo Em Paz",
      "artist": "Jorge & Mateus",
      "genre": "Sertanejo",
      "album": "Tudo Em Paz",
      "label": "Som Livre",
      "track": 1,
      "disk": null,
      "duration": 213.3420408163265,
      "bitrate": null,
      "numberOfChannels": null,
      "played": 0,
      "reated": 4,
      "folder": "D:\\Música\\Jorge & Mateus - Tudo Em Paz",
      "path": "D:\\Música\\/Jorge & Mateus - Tudo Em Paz/01 - Jorge & Mateus - Tudo Em Paz.mp3",
      "lyrics": null,
      "year": 2021,
      "created_at": "2023-04-28T21:25:25.867Z"
   },
   {
      "id": 440,
      "title": "Troca",
      "artist": "Jorge & Mateus",
      "genre": "Sertanejo",
      "album": "Tudo Em Paz",
      "label": "Som Livre",
      "track": 2,
      "disk": null,
      "duration": 171.3110204081633,
      "bitrate": null,
      "numberOfChannels": null,
      "played": 0,
      "reated": 4,
      "folder": "D:\\Música\\Jorge & Mateus - Tudo Em Paz",
      "path": "D:\\Música\\/Jorge & Mateus - Tudo Em Paz/02 - Jorge & Mateus - Troca.mp3",
      "lyrics": null,
      "year": 2021,
      "created_at": "2023-04-28T21:25:25.867Z"
   },
   {
      "id": 441,
      "title": "Namorando Com Saudade",
      "artist": "Jorge & Mateus",
      "genre": "Sertanejo",
      "album": "Tudo Em Paz",
      "label": "Som Livre",
      "track": 3,
      "disk": null,
      "duration": 174.1322448979592,
      "bitrate": null,
      "numberOfChannels": null,
      "played": 0,
      "reated": 5,
      "folder": "D:\\Música\\Jorge & Mateus - Tudo Em Paz",
      "path": "D:\\Música\\/Jorge & Mateus - Tudo Em Paz/03 - Jorge & Mateus - Namorando Com Saudade.mp3",
      "lyrics": null,
      "year": 2021,
      "created_at": "2023-04-28T21:25:25.867Z"
   },
   {
      "id": 442,
      "title": "Me Ame Mais",
      "artist": "Jorge & Mateus",
      "genre": "Sertanejo",
      "album": "Tudo Em Paz",
      "label": "Som Livre",
      "track": 4,
      "disk": null,
      "duration": 229.9036734693878,
      "bitrate": null,
      "numberOfChannels": null,
      "played": 0,
      "reated": 2,
      "folder": "D:\\Música\\Jorge & Mateus - Tudo Em Paz",
      "path": "D:\\Música\\/Jorge & Mateus - Tudo Em Paz/04 - Jorge & Mateus, Marília Mendonça - Me Ame Mais.mp3",
      "lyrics": null,
      "year": 2021,
      "created_at": "2023-04-28T21:25:25.867Z"
   },
   {
      "id": 443,
      "title": "Vogais e Consoantes",
      "artist": "Jorge & Mateus",
      "genre": "Sertanejo",
      "album": "Tudo Em Paz",
      "label": "Som Livre",
      "track": 5,
      "disk": null,
      "duration": 216.5812244897959,
      "bitrate": null,
      "numberOfChannels": null,
      "played": 0,
      "reated": 2,
      "folder": "D:\\Música\\Jorge & Mateus - Tudo Em Paz",
      "path": "D:\\Música\\/Jorge & Mateus - Tudo Em Paz/05 - Jorge & Mateus - Vogais e Consoantes.mp3",
      "lyrics": null,
      "year": 2021,
      "created_at": "2023-04-28T21:25:25.867Z"
   },
   {
      "id": 444,
      "title": "O Sol Tá Dando Oi",
      "artist": "Jorge & Mateus",
      "genre": "Sertanejo",
      "album": "Tudo Em Paz",
      "label": "Som Livre",
      "track": 6,
      "disk": null,
      "duration": 155.4024489795918,
      "bitrate": null,
      "numberOfChannels": null,
      "played": 0,
      "reated": 4,
      "folder": "D:\\Música\\Jorge & Mateus - Tudo Em Paz",
      "path": "D:\\Música\\/Jorge & Mateus - Tudo Em Paz/06 - Jorge & Mateus - O Sol Tá Dando Oi.mp3",
      "lyrics": null,
      "year": 2021,
      "created_at": "2023-04-28T21:25:25.867Z"
   },
   {
      "id": 445,
      "title": "Desisto",
      "artist": "Jorge & Mateus",
      "genre": "Sertanejo",
      "album": "Tudo Em Paz",
      "label": "Som Livre",
      "track": 7,
      "disk": null,
      "duration": 222.7722448979592,
      "bitrate": null,
      "numberOfChannels": null,
      "played": 0,
      "reated": 4,
      "folder": "D:\\Música\\Jorge & Mateus - Tudo Em Paz",
      "path": "D:\\Música\\/Jorge & Mateus - Tudo Em Paz/07 - Jorge & Mateus - Desisto.mp3",
      "lyrics": null,
      "year": 2021,
      "created_at": "2023-04-28T21:25:25.867Z"
   },
   {
      "id": 446,
      "title": "Por Que Parou Na Porta?",
      "artist": "Jorge & Mateus",
      "genre": "Sertanejo",
      "album": "Tudo Em Paz",
      "label": "Som Livre",
      "track": 8,
      "disk": null,
      "duration": 148.6889795918367,
      "bitrate": null,
      "numberOfChannels": null,
      "played": 0,
      "reated": 4,
      "folder": "D:\\Música\\Jorge & Mateus - Tudo Em Paz",
      "path": "D:\\Música\\/Jorge & Mateus - Tudo Em Paz/08 - Jorge & Mateus - Por Que Parou Na Porta.mp3",
      "lyrics": null,
      "year": 2021,
      "created_at": "2023-04-28T21:25:25.867Z"
   },
   {
      "id": 447,
      "title": "Do Jeito Que Tá Não Dá",
      "artist": "Jorge & Mateus",
      "genre": "Sertanejo",
      "album": "Tudo Em Paz",
      "label": "Som Livre",
      "track": 9,
      "disk": null,
      "duration": 181.890612244898,
      "bitrate": null,
      "numberOfChannels": null,
      "played": 0,
      "reated": 4,
      "folder": "D:\\Música\\Jorge & Mateus - Tudo Em Paz",
      "path": "D:\\Música\\/Jorge & Mateus - Tudo Em Paz/09 - Jorge & Mateus - Do Jeito Que Tá Não Dá.mp3",
      "lyrics": null,
      "year": 2021,
      "created_at": "2023-04-28T21:25:25.867Z"
   },
   {
      "id": 448,
      "title": "Paradigmas",
      "artist": "Jorge & Mateus",
      "genre": "Sertanejo",
      "album": "Tudo Em Paz",
      "label": "Som Livre",
      "track": 10,
      "disk": null,
      "duration": 157.4138775510204,
      "bitrate": null,
      "numberOfChannels": null,
      "played": 0,
      "reated": 5,
      "folder": "D:\\Música\\Jorge & Mateus - Tudo Em Paz",
      "path": "D:\\Música\\/Jorge & Mateus - Tudo Em Paz/10 - Jorge & Mateus - Paradigmas.mp3",
      "lyrics": null,
      "year": 2021,
      "created_at": "2023-04-28T21:25:25.867Z"
   },
   {
      "id": 449,
      "title": "Hit do Ano",
      "artist": "Jorge & Mateus",
      "genre": "Sertanejo",
      "album": "Tudo Em Paz",
      "label": "Som Livre",
      "track": 11,
      "disk": null,
      "duration": 154.88,
      "bitrate": null,
      "numberOfChannels": null,
      "played": 0,
      "reated": 4,
      "folder": "D:\\Música\\Jorge & Mateus - Tudo Em Paz",
      "path": "D:\\Música\\/Jorge & Mateus - Tudo Em Paz/11 - Jorge & Mateus - Hit do Ano.mp3",
      "lyrics": null,
      "year": 2021,
      "created_at": "2023-04-28T21:25:25.867Z"
   },
   {
      "id": 450,
      "title": "Lance Individual",
      "artist": "Jorge & Mateus",
      "genre": "Sertanejo",
      "album": "Tudo Em Paz",
      "label": "Som Livre",
      "track": 12,
      "disk": null,
      "duration": 164.4930612244898,
      "bitrate": null,
      "numberOfChannels": null,
      "played": 0,
      "reated": 5,
      "folder": "D:\\Música\\Jorge & Mateus - Tudo Em Paz",
      "path": "D:\\Música\\/Jorge & Mateus - Tudo Em Paz/12 - Jorge & Mateus - Lance Individual.mp3",
      "lyrics": null,
      "year": 2021,
      "created_at": "2023-04-28T21:25:25.867Z"
   },
   {
      "id": 451,
      "title": "Treta",
      "artist": "Jorge & Mateus",
      "genre": "Sertanejo",
      "album": "Tudo Em Paz",
      "label": "Som Livre",
      "track": 13,
      "disk": null,
      "duration": 221.4138775510204,
      "bitrate": null,
      "numberOfChannels": null,
      "played": 0,
      "reated": 3,
      "folder": "D:\\Música\\Jorge & Mateus - Tudo Em Paz",
      "path": "D:\\Música\\/Jorge & Mateus - Tudo Em Paz/13 - Jorge & Mateus - Treta.mp3",
      "lyrics": null,
      "year": 2021,
      "created_at": "2023-04-28T21:25:25.867Z"
   },
   {
      "id": 452,
      "title": "Namora Eu Aí",
      "artist": "Jorge & Mateus",
      "genre": "Sertanejo",
      "album": "Tudo Em Paz",
      "label": "Som Livre",
      "track": 14,
      "disk": null,
      "duration": 156.3689795918367,
      "bitrate": null,
      "numberOfChannels": null,
      "played": 0,
      "reated": 5,
      "folder": "D:\\Música\\Jorge & Mateus - Tudo Em Paz",
      "path": "D:\\Música\\/Jorge & Mateus - Tudo Em Paz/14 - Jorge & Mateus - Namora Eu Aí.mp3",
      "lyrics": null,
      "year": 2021,
      "created_at": "2023-04-28T21:25:25.867Z"
   }
]

export function PlayerProvider({ children }) {
   const [handleHowl, setHandleHowl] = useState(null);
   const [musicContext, setMusicContext] = useState({
      musics: [],
      current: null
   });

   useEffect(() => {
      if (musicContext.current === null) return;

      const { current, musics } = musicContext;
      const howlGlobal = createHowler(musics[current].path);

      setHandleHowl(() => howlGlobal)

      return () => {
         howlGlobal(howl => howl.unload())
      }

   }, [musicContext])

   const playMusic = (musics, current) => {
      setMusicContext({
         musics,
         current
      });
   }

   return (
      <PlayerContext.Provider value={{
         currentMusic: musicContext.musics[musicContext.current] || musics[0],
         handleHowl,
         playMusic
      }}>
         {children}
      </PlayerContext.Provider>
   )
}