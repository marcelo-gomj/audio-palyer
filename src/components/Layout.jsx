import { ContentMain } from "./Contents/ContentMain";
import { ModalProvider } from "./Contexts/ModalContext";
import { PlayerContext, PlayerProvider } from "./Contexts/PlayerContext";
import { RouteProvider } from "./Contexts/RouteContext";
import { PlayerFooter } from "./Player";
import { AsideLayout } from "./Sidebar";


export function Layout() {
   return (
      <PlayerProvider>
         <RouteProvider>
            <ModalProvider>
               <div className="h-full">

                  {/* h-[calc(100%-4.5rem)] */}
                  <main className="flex relative w-full  h-[calc(100%-5.6rem)]">
                     <AsideLayout />
                     <ContentMain />
                  </main>

                  <PlayerFooter />

               </div>
            </ModalProvider>
         </RouteProvider>
      </PlayerProvider>
   )
}