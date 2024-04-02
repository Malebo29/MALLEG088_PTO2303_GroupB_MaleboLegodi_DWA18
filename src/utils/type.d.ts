import React from "react";
import { Session } from "@supabase/supabase-js";
import { Favorite } from "@mui/icons-material";


export type ShowsContextType = { 
    playerRef: RefObject<HTMLAudioElement>; 

    favourites: FavoriteProps[] | null
    setFavourites: React.Dispatch<React.SetStateAction<FavoriteProps[] | null>>;

    favouriteEpisodes: FavoriteEpisodes[];
    setFavouriteEpisodes: React.Dispatch<React.SetStateAction<FavoriteEpisodes[]>>;

    history: HistoryProps[] | null
    setHistory: React.Dispatch<React.SetStateAction<HistoryProps[] | null>>;

    shows: Show[];
    setShows: React.Dispatch<React.SetStateAction<Show[]>>;

    selectedSeason: number;
    setSelectedSeason: React.Dispatch<React.SetStateAction<number>>;

    sort: string | undefined;
    setSort: React.Dispatch<React.SetStateAction<string | undefined>>;

    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;

    token: Session | null;
    setToken: React.Dispatch<React.SetStateAction<Session | null>>;

    selectedGenre: number | undefined;
    setSelectedGenre: React.Dispatch<React.SetStateAction<number | undefined>>;

    sortOption: 'titleAZ' | 'titleZA' | 'dateAsc' | 'dateDesc' | undefined;
    setSortOption: React.Dispatch<React.SetStateAction<'titleAZ' | 'titleZA' | 'dateAsc' | 'dateDesc' | undefined>>;

    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export type FavoriteEpisodes = {
    episodeId: number,
    seasonId: number,
    showTitle: string
}

export type FavoriteProps = {
    episodeId: number
    episodeTitle: string
    episodeDescription: string
    seasonId: number
    seasonImage: string;
    showTitle: string   
    lastUpdatedShowDate: string
    favoredDate: string
}

export type HistoryProps = {
    created_at: string
    episodeId: number | null
    episodeTitle: string | null
    id: number
    playProgress: string | null
    playStatus: string | null
    seasonId: number | null
    showId: number | null
    userId: string | null
}

export type AudioPlayerProps ={
    audioFile: Episode,
    audioRef: React.LegacyRef<HTMLAudioElement> | undefined
}

export type Show ={
    id:          string;
    title:       string;
    description: string;
    seasons:     number;
    image:       string;
    genres:      number[];
    updated:     Date;
    episodes: Episode[];
}

export type ShowDetail = {
    id:          string;
    title:       string;
    description: string;
    seasons:     Season[];
    image:       string;
    genres:      string[];
    updated:     Date;
}

export type Season = {
    season:   number;
    title:    string;
    image:    string;
    episodes: Episode[];
}

export type Episode = {
    title:       string;
    description: string;
    episode:     number; 
    file:        string;
}