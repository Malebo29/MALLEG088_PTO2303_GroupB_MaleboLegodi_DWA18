
export type ShowsContextType = {
    shows: Show[];
    setShows: React.Dispatch<React.SetStateAction<Show[]>>;
    mobileMenuOpen: boolean;
    setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;

    sort: string;
    setsort: React.Dispatch<React.SetStateAction<string>>;

    search: string;
    setsearch: React.Dispatch<React.SetStateAction<string>>;
}

export type Show ={
    id:          string;
    title:       string;
    description: string;
    seasons:     number;
    image:       string;
    genres:      number[];
    updated:     Date;
}