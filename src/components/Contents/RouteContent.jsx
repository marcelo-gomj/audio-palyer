import { ListAlbums } from "./Albums.jsx"
import { ListAlbum } from "./Album/index.jsx";
import { SearchItems } from "./SearchItems.jsx";

function getAlbums(path, id) {
   if (id) {
      return <ListAlbum path={path} id={id} />
   }

   return <ListAlbums path={path} />
}

export function getContent({ path, id }) {
   switch (path) {
      case "":
         return null;

      case "album":
         return getAlbums(path, id);

      case "artist":
      case "genre":
         if (id) return <ListAlbums path={"album"} where={{ [path]: id }} />;
         return;

      case "search":
         return null

      case "folder":
         if (id) {
            return <ListAlbum path={path} id={id} />
         }

         return null
      case "playlist":
         return null;

      default:
         return null
   }
}
