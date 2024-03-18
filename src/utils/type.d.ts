
export type ShowsContextType = {
    // initialShowList: Sho
    shows: Show[];
    setShows: React.Dispatch<React.SetStateAction<Show[]>>;

    mobileMenuOpen: boolean;
    setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
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