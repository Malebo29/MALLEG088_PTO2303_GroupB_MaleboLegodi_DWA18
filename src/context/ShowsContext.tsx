import { ReactNode, createContext, useContext, useState, useRef, useEffect } from "react";
import { FavoriteEpisodes, FavoriteProps, HistoryProps, Show, ShowsContextType } from "../utils/type";
import { Session } from "@supabase/supabase-js";

import { supabase } from "../auth/supabase.service";
import Cookies from 'js-cookie'
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

    useEffect(() => {
        const getSession = async()=>{
            const cookieSession = Cookies.get('_streamerSession')

            if(cookieSession!=null && cookieSession!=undefined){
                // console.log(JSON.parse(cookieSession))
                const session  = await JSON.parse(cookieSession)
                // console.log(session)
                setToken(session)
            //if(error) console.log(error)
            } else {
                const userSession = await supabase.auth.getSession()
                if(userSession != null)  {
                    setToken(userSession.data.session)
                    Cookies.set('_streamerSession', JSON.stringify(userSession), { expires: 1})
                }
                }
        
        }

        getSession()

    }, [])
    
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