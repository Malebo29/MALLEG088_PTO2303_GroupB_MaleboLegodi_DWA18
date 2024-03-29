import { Box, Button, Container, Typography } from '@mui/material'
import Favourate from '../components/modules/favourates'
import { useShowsContext } from '../context/ShowsContext'
import { FavoriteProps } from '../utils/type'
import { useNavigate } from 'react-router-dom'

const FavouratesPage = () => {
  const navigate = useNavigate();
  const { favourites, sortOption } = useShowsContext()

  const sortedFavourates = [...(favourites || [])].sort((a, b) => {
    switch (sortOption) {
      case 'title-asc': return a.showTitle.localeCompare(b.showTitle);
      case 'title-desc': return b.showTitle.localeCompare(a.showTitle);

      case 'date-asc': return new Date(a.lastUpdatedShowDate).getTime() - new Date(b.lastUpdatedShowDate).getTime();
      case 'date-desc': return new Date(b.lastUpdatedShowDate).getTime() - new Date(a.lastUpdatedShowDate).getTime();

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
 
  return (
    <Container maxWidth="sm" sx={{ pt: '100px', display: 'flex', flexDirection: 'column' }}>
       <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Button variant='outlined' onClick={() => navigate(-1)}>Go Back</Button>
        <Typography variant="h4" align="center" sx={{ fontSize: "2rem", mt: 2, mb: 2, fontWeight: 'bold' }}>My Fourourate Shows</Typography>
      </Box>
      {groupedFavourates && Object.entries(groupedFavourates).map(([showTitle, favs]) => (
        <Box key={showTitle}>
          <Typography variant='h4'>{showTitle}</Typography>
          
          {favs.map((fav, index) => <Favourate key={index} {...fav}/>)}
        </Box>
      )
      
      )}
        {/* {favourites?.map((fav: FavoriteProps ) => <Favourate  {...fav}/>)} */}
    </Container>
  )

}

export default FavouratesPage