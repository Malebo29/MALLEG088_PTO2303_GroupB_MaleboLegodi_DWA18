import { Container, Box, useTheme } from '@mui/material'
import ShowList from '../components/show/ShowList'
import Filter from '../components/filter/Filter'

const HomePage = () => {
  const theme = useTheme()
  return (
    <Container sx={{ mt: 10  }}>
      <Box sx={{height: theme.spacing(2)}} />
      <Box sx={{height: theme.spacing(2)}} />
      <Filter />
      <Box sx={{height: theme.spacing(2)}} />
      <ShowList />
    </Container>
  )
}

export default HomePage