import { ContentMain } from "./Contents/ContentMain";
import { ModalProvider } from "./Contexts/ModalContext";
import { RouteProvider } from "./Contexts/RouteContext";
import { FooterLayout } from "./Footer";
import { AsideLayout } from "./Sidebar";

export function Layout() {
   return (
      <RouteProvider>
         <ModalProvider>
            <main>
               <AsideLayout />
               <ContentMain />
            </main>
            <FooterLayout />
         </ModalProvider>
      </RouteProvider>
   )
}