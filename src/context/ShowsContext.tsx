import { ReactNode, createContext, useContext, useState } from "react";
import { Show, ShowsContextType } from "../utils/type";

const ShowsContext = createContext<ShowsContextType | null>(null)

export const ShowsContextProvider: React.FC<{children: ReactNode, initialShowList: Show[]}> = ({ children, initialShowList })=>{
    const [shows, setShows] = useState(initialShowList)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [token, setToken] = useState<string>('')
    const [selectedSeason, setSelectedSeason] = useState(1);
    const [favourites, setFavourites] = useState([]);

    const [sort, setSort] = useState('');
    const [search, setSearch] = useState('');
   
   return (
    <ShowsContext.Provider value={{ shows, setShows, mobileMenuOpen, setMobileMenuOpen, token, setToken, sort, setSort, search, setSearch, selectedSeason, setSelectedSeason, 
        favourites, setFavourites }}>
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