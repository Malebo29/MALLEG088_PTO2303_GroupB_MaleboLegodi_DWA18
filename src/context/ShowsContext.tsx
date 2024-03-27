import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { FavoriteProps, Show, ShowsContextType } from "../utils/type";
import { supabase } from "../auth/supabase.service";

const ShowsContext = createContext<ShowsContextType | null>(null)

export const ShowsContextProvider: React.FC<{children: ReactNode, initialShowList: Show[]}> = ({ children, initialShowList })=>{
    const [shows, setShows] = useState(initialShowList)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [token, setToken] = useState<string>('')
    const [selectedSeason, setSelectedSeason] = useState(1);
    const [favourites, setFavourites] = useState<FavoriteProps[] | null>(null);

    const [sort, setSort] = useState('');
    const [search, setSearch] = useState('');

    const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
    const [sortOption, setSortOption] = useState('');

    useEffect(() => {
      const fetchFavourites = async()=>{
        const userId = await(await supabase.auth.getUser()).data.user?.id

        const { data, error } = await supabase
        .from('user_favourates')
        .select("*")
        .eq('userId', userId)

        if(error) console.log(error.message)

        setFavourites(data)
      }


      fetchFavourites()
    }, [])
    
   
   return (
    <ShowsContext.Provider 
        value={{ shows, setShows, mobileMenuOpen, setMobileMenuOpen,
              token, setToken, sort, setSort, search, setSearch,
              selectedSeason, setSelectedSeason, favourites, setFavourites,
              selectedGenre, setSelectedGenre, sortOption, setSortOption }}>
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