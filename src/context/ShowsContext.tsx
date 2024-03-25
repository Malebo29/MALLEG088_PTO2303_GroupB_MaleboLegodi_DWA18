import { ReactNode, createContext, useContext, useState } from "react";
import { Show, ShowsContextType } from "../utils/type";

const ShowsContext = createContext<ShowsContextType | null>(null)

export const ShowsContextProvider: React.FC<{children: ReactNode, initialShowList: Show[]}> = ({ children, initialShowList })=>{
    const [shows, setShows] = useState(initialShowList)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [selectedSeason, setSelectedSeason] = useState(1) // Add this line
   
   return (
    <ShowsContext.Provider value={{ shows, setShows, mobileMenuOpen, setMobileMenuOpen, selectedSeason, setSelectedSeason }}>
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