import { createContext, useState } from 'react';

export const RouteContext = createContext(null);

export function RouteProvider({ children }) {
   const [route, setRoute] = useState({ path: "", id: "" });

   return (
      <RouteContext.Provider value={{ route, setRoute }}>
         {children}
      </RouteContext.Provider>
   )
}