import { Box, Container, useTheme } from '@mui/material'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Header } from './components/header/Header';
import ShowList from './components/show/ShowList';
import Carousel from './components/carousel/Carousel';
import Filter from './components/filter/Filter';

function App() {
  const theme = useTheme()

  return (
    <Box sx={{ backgroundColor: "#040736", width:"100%", padding: '1rem 0'}}>
      <Container sx={{ maxWidth: "80%", margin: '0 auto' }}>
        <Header />
        <Box sx={{height: theme.spacing(2)}} />
        <Carousel />
        <Box sx={{height: theme.spacing(2)}} />
        <Box sx={{height: theme.spacing(2)}} />
        <Filter />
        <Box sx={{height: theme.spacing(2)}} />
        <ShowList />
      </Container>
    </Box>
  )
}

export default App
