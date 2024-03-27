import { Container, Box, useTheme } from '@mui/material'
import ShowList from '../components/show/ShowList'
import Carousel from '../components/carousel/Carousel'
import Filter from '../components/filter/Filter'

const HomePage = () => {
  const theme = useTheme()
  return (
    <Container sx={{ maxWidth: "80%", margin: '0 auto' }}>
      <Box sx={{height: theme.spacing(2)}} />
      <Carousel />
      <Box sx={{height: theme.spacing(2)}} />
      <Box sx={{height: theme.spacing(2)}} />
      <Filter />
      <Box sx={{height: theme.spacing(2)}} />
      <ShowList />
    </Container>

  )
}

export default HomePage