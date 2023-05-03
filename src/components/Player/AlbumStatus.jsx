import Mini from "../assets/mini.svg";
import { Image } from "../ImageMeta";

export function AlbumStatus({ path, content }) {
   return (
      <div className="flex relative items-center gap-4 md:w-4/12 lg:w-4/12 cursor-pointer">
         <div className="flex items-center">
            <Image
               path={path}
               len={"w-12 h-12 rounded-[4px]"}
            />
         </div>

         <div className="py-2 w-full pr-5">
            <h4 className="font-semibold md:text-sm lg:text-base leading-[1.2rem] line-clamp-2">{content.title}</h4>
            <p className="text-[0.85rem] line-clamp-1 text-white-400 font-medium">{content.album}</p>
         </div>

         <Mini className="absolute w-5 h-5 right-1 bottom-2" />
      </div>
   )
}
