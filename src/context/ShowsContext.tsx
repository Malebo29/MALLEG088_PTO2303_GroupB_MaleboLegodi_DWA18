import { ReactNode, createContext, useContext, useEffect, useState, useRef } from "react";
import { FavoriteEpisodes, FavoriteProps, HistoryProps, Show, ShowsContextType } from "../utils/type";
import { supabase } from "../auth/supabase.service";
import { Session } from "@supabase/supabase-js";

const ShowsContext = createContext<ShowsContextType | null>(null)

export const ShowsContextProvider: React.FC<{children: ReactNode, initialShowList: Show[]}> = ({ children, initialShowList })=>{
    const [shows, setShows] = useState(initialShowList)
    const [token, setToken] = useState<Session | null>(null)
    const [selectedSeason, setSelectedSeason] = useState(1);
    const [favourites, setFavourites] = useState<FavoriteProps[] | null>(null);
    const [favouriteEpisodes, setFavouriteEpisodes] = useState<FavoriteEpisodes[]>([]);
    const [history, setHistory]= useState<HistoryProps[] | null>(null);

    const playerRef = useRef<HTMLAudioElement>(null)

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

      const fetchUserHistory = async()=>{
        const userId = await(await supabase.auth.getUser()).data.user?.id

        const { data, error } = await supabase
        .from('user_history')
        .select("*")
        .eq('userId', userId)

        if(error) console.log(error.message)

        setHistory(data)
      }


      fetchUserHistory()
      fetchFavourites()
    }, [])
    
   
   return (
    <ShowsContext.Provider 
        value={{ playerRef, shows, setShows, token, setToken, sort, setSort, search, setSearch,
              selectedSeason, setSelectedSeason, favourites, setFavourites, favouriteEpisodes, setFavouriteEpisodes,
              selectedGenre, setSelectedGenre, sortOption, setSortOption,history, setHistory }}>
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