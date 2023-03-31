import { AsideLayout } from "./Sidebar";
import { FooterLayout } from "./Footer";
import { ContentMain } from "./Contents/ContentMain";
import { ModalProvider } from "./Contexts/ModalContext";
import { useState } from "react";

export function Layout() {
   const [category, setCategory] = useState("");

   return (
      <ModalProvider>
         <main>
            <AsideLayout handleCategory={setCategory} />
            <ContentMain 
               category={category}
            />
         </main>
         <FooterLayout />
      </ModalProvider>
   )
}