import { SelectFolderButton } from "../Modal/SelectFolders";

export function ContentMain({ category }) {
   function generateContent(category) {
      if(category === "albums"){
         return (
            <SelectFolderButton />
         )
      }
   }

   return (
      <div className="content">
         {
            generateContent(category)
         }
      </div>
   )
}