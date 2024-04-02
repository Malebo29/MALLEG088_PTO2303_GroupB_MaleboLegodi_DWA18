import { Box, Button, Card, CardContent, Container, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material'
import Favourate from '../components/modules/favourates'
import { useShowsContext } from '../context/ShowsContext'
import { FavoriteProps } from '../utils/type'
import { useNavigate } from 'react-router-dom'
import { UndoRounded } from '@mui/icons-material'
import { useEffect } from 'react'
import { supabase } from '../auth/supabase.service'

const FavouratesPage = () => {
  const navigate = useNavigate();
  const { favourites, setFavourites, sortOption,  setSortOption } = useShowsContext()

  const sortedFavourates = [...(favourites || [])].sort((a, b) => {
    switch (sortOption) {
      case 'titleAZ': return a.showTitle.localeCompare(b.showTitle);
      case 'titleZA': return b.showTitle.localeCompare(a.showTitle);

      case 'dateAsc': return new Date(a.lastUpdatedShowDate).getTime() - new Date(b.lastUpdatedShowDate).getTime();
      case 'dateDesc': return new Date(b.lastUpdatedShowDate).getTime() - new Date(a.lastUpdatedShowDate).getTime();

      default:
        return 0;
    }
  });

  const groupedFavourates = sortedFavourates.reduce((groups, fav) => {
    const group = (groups[fav.showTitle] || []);
    group.push(fav);
    groups[fav.showTitle] = group;
    return groups;
  }, {} as Record<string, FavoriteProps[]>);

  useEffect(() => {
    const fetchFavourites = async () => {
      const userId = await (await supabase.auth.getUser()).data.user?.id

      const { data, error } = await supabase
        .from('user_favourates')
        .select("*")
        .eq('userId', userId)

      if (error) console.log(error.message)

      setFavourites(data)
    }

    fetchFavourites()
  }, [])

  const handleSortChange = (event: SelectChangeEvent ) => {
    setSortOption(event.target.value as 'titleAZ' | 'titleZA' | 'dateAsc' | 'dateDesc');
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Container maxWidth="sm" sx={{ pt: '100px', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Button
            variant='outlined'
            startIcon={<UndoRounded sx={{ color: "#2DD699" }} />}
            onClick={() => navigate(-1)}
            sx={{ border: "1px solid #2DD699", color: '#040736', marginRight: "10px" }}>
            Go Back
          </Button>
          <Typography variant="h4" align="center" sx={{ fontSize: "2rem", mt: 2, mb: 2, fontWeight: 'bold' }}>My favourate shows</Typography>
        </Box>

        <Box>
            <FormControl variant="outlined" size="small" sx={{ minWidth: 200, width: { xs: '100%', sm: 'auto' }}}>
                    <InputLabel id="sort-label" sx={{color: '#000'}}>Sort By</InputLabel>
                    <Select
                        labelId="sort-label"
                        value={sortOption || ""}
                        onChange={handleSortChange}
                        label="Sort By"
                        sx={{color: '#000'}}
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        <MenuItem value="titleAZ">Title (A-Z)</MenuItem>
                        <MenuItem value="titleZA">Title (Z-A)</MenuItem>
                        <MenuItem value="dateAsc">Date Updated (Ascending)</MenuItem>
                        <MenuItem value="dateDesc">Date Updated (Descending)</MenuItem>
                    </Select>
              </FormControl>
        </Box>

        <Box sx={{ mt: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

          {!groupedFavourates.lenght ? <Card>
            <CardContent>
              <Typography variant='h5'>Your favourate shows list is currently empty. This page gets populated whenever you like an episode show.</Typography>
            </CardContent>
          </Card> : groupedFavourates && Object.entries(groupedFavourates).map(([showTitle, favs]) => (
            <Box key={showTitle}>
              <Typography variant='h4'>{showTitle}</Typography>
              {favs.map((fav, index) => <Favourate key={index} {...fav} />)}
            </Box>
          )
          )}

        </Box>

      </Container>
    </Box>

  )

}

export default FavouratesPage