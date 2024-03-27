export type ShowsContextType = {    
    favourites: FavoriteProps[] | null
    setFavourites: React.Dispatch<React.SetStateAction<FavoriteProps[] | null>>;

    shows: Show[];
    setShows: React.Dispatch<React.SetStateAction<Show[]>>;

    mobileMenuOpen: boolean;
    setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;

    selectedSeason: number;
    setSelectedSeason: React.Dispatch<React.SetStateAction<number>>;

    token: string;
    setToken: React.Dispatch<React.SetStateAction<string>>;
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