import { createContext, useState } from 'react';

type RouteProps = {
   children: React.ReactNode
}

type defaultProps = {
   path: string,
   id?: string,
}

export type typeRouteContext = {
   route: defaultProps,
   setRoute: React.Dispatch<React.SetStateAction<defaultProps>>
}

export const RouteContext = createContext<typeRouteContext>({} as typeRouteContext);

export function RouteProvider({ children }: RouteProps) {
   const [route, setRoute] = useState<defaultProps>({ path: "", id: "" });

   return (
      <RouteContext.Provider value={{ route, setRoute }}>
         {children}
      </RouteContext.Provider>
   )
}