import { Box, Container, Typography } from '@mui/material'
import Favourate from '../components/modules/favourates'
import { useShowsContext } from '../context/ShowsContext'
import { FavoriteProps } from '../utils/type'

const FavouratesPage = () => {
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
    <Container>
      {groupedFavourates && Object.entries(groupedFavourates).map(([showTitle, favs]) => (
        <Box key={showTitle}>
          <Typography variant='h4'>{showTitle}</Typography>
          
          {favs.map((fav) => <Favourate key={fav.episodeId} {...fav}/>)}
        </Box>
      )
      
      )}
        {/* {favourites?.map((fav: FavoriteProps ) => <Favourate  {...fav}/>)} */}
    </Container>
  )

}

export default FavouratesPage