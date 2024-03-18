import { ReactNode, createContext, useContext, useState } from "react";
import { Show, ShowsContextType } from "../utils/type";

const ShowsContext = createContext<ShowsContextType | null>(null)

export const ShowsContextProvider: React.FC<{children: ReactNode, initialShowList: Show[]}> = ({ children, initialShowList })=>{
    const [shows, setShows] = useState(initialShowList)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const [sort, setSort] = useState('');
    const [search, setSearch] = useState('');
   
   return (
    <ShowsContext.Provider value={{ shows, setShows, mobileMenuOpen, setMobileMenuOpen, sort, setSort, search, setSearch }}>
        { children }
    </ShowsContext.Provider>
   )

}

export const useShowsContext = ()=>{
    const context = useContext(ShowsContext)

    if(!context){
        throw new Error("useShowsContext must be used within a ShowsContextProvider")
    }
    return context

}