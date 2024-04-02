import { ReactNode, createContext, useContext, useState, useRef } from "react";
import { FavoriteEpisodes, FavoriteProps, HistoryProps, Show, ShowsContextType } from "../utils/type";
import { Session } from "@supabase/supabase-js";

const ShowsContext = createContext<ShowsContextType | null>(null)

export const ShowsContextProvider: React.FC<{children: ReactNode, initialShowList: Show[]}> = ({ children, initialShowList })=>{
    const [shows, setShows] = useState(initialShowList)
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState<Session | null>(null)
    const [selectedSeason, setSelectedSeason] = useState(1);
    const [favourites, setFavourites] = useState<FavoriteProps[] | null>(null);
    const [favouriteEpisodes, setFavouriteEpisodes] = useState<FavoriteEpisodes[]>([]);
    const [history, setHistory]= useState<HistoryProps[] | null>(null);

    const playerRef = useRef<HTMLAudioElement>(null)

    const [sort, setSort] = useState<string | undefined>(undefined);
    const [search, setSearch] = useState('');

    const [selectedGenre, setSelectedGenre] = useState<number | undefined>(undefined);
    const [sortOption, setSortOption] = useState<'titleAZ' | 'titleZA' | 'dateAsc' | 'dateDesc' | undefined>(undefined);

   return (
    <ShowsContext.Provider 
        value={{ playerRef, shows, setShows, loading, setLoading, token, setToken, sort, setSort, search, setSearch,
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