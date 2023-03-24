import { AsideLayout } from "./Sidebar";
import { FooterLayout } from "./Footer";
import { ContentMain } from "./Contents/ContentMain";
import { ModalProvider } from "./Contexts/ModalContext";

export function Layout() {
   return (
      <ModalProvider>
         <main>
            <AsideLayout />
            <ContentMain 
               category={"albums"}
            />
         </main>
         <FooterLayout />
      </ModalProvider>
   )
}