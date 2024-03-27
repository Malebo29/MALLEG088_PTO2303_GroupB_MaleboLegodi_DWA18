import { Container } from '@mui/material'
import Favourate from '../components/modules/favourates'
import { useShowsContext } from '../context/ShowsContext'
import { FavoriteProps } from '../utils/type'

const FavouratesPage = () => {
  const { favourites } = useShowsContext()
 
  return (
    <Container>
        {favourites?.map((fav: FavoriteProps ) => <Favourate  {...fav}/>)}
    </Container>
  )

}

export default FavouratesPage