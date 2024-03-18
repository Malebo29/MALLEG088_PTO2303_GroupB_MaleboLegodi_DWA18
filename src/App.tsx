import { Header } from './components/header/Header'
import { ShowList } from './components/show/ShowList'
import { Box, Container, useTheme } from '@mui/material'
import "react-responsive-carousel/lib/styles/carousel.min.css"

function App() {
  const theme = useTheme()

  return (
    <Box sx={{ backgroundColor: "#040736", width: "100%", padding: "1rem 0"}}>
      <Container sx={{ maxWidth: "80%", margin: "0 auto" }}>
        <Header />

        <ShowList />
      </Container>
    </Box>
  )
}

export default App
