import { Image } from "../ImageMeta";

import { 
   pipe, uniqBy, split, 
   join, init, splitEvery, nth, when,propSatisfies, 
   take, append, gt, __ 
} from "ramda";

import { FixedSizeList } from "react-window";

import SearchIcon from "../assets/search.svg";

import styles from "./list-a.module.css";


export function ListAlbums({ list }) {
   const albums = splitEvery(3, uniqBy(
      obj => obj?.album || join("", init(split("/", obj?.path || "música/pasta")))
   )(list))

   const row = ({ style, index }) => {
      const musics = albums[index];

      return (
         <div style={style} className={styles["albums-row"]} key={musics[0]?.id}>
            {
               musics.map( music => {
               const albumName = music?.album || nth( -2, split("/", music?.path)) || "";

               const title = when( 
                  propSatisfies(gt(__, 40), 'length'),
                  pipe(take(40), append('…'), join(''))
               )(split("", albumName))

               return (
                  <div className={styles["album-item"]}>
                     
                     <Image path={music?.path} />

                     <div className={styles["album-info"]}>
                        <h3>{title}</h3>
                        <p>{(music?.artist || "")}</p><span>{music?.year ? " - " + music?.year : ""}</span>
                     </div>
                  </div>
               )})
            }
         </div>
      )
   }

   return (
      <div className={styles["list-container"]}>
         <div className={styles["header-list"]}>
            <div className={styles["header-input"]}>
               <SearchIcon />
               <input 
                  type="text"
                  placeholder="Buscar albums" 
               />
            </div>
            <p>Ordem Alfabetica</p>
         </div>

         <div className={styles["albums-container"]}>
            <FixedSizeList
               width={"100%"}
               height={900}
               itemCount={albums.length}
               itemSize={280}
            >{
               row
            }</FixedSizeList>
         </div>
      </div>
   )
}