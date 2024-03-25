export type ShowsContextType = {
    shows: Show[];
    setShows: React.Dispatch<React.SetStateAction<Show[]>>;

    mobileMenuOpen: boolean;
    setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;

    selectedSeason: number;
    setSelectedSeason: React.Dispatch<React.SetStateAction<number>>;
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