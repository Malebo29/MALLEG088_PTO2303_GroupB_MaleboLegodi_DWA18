import { NavigateBeforeRounded, NavigateNextRounded } from '@mui/icons-material'
import { Box, Container, IconButton, Slide, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import { useShowsContext } from '../../context/ShowsContext'
import { Show } from '../../utils/type'
import { CarouselPreview } from './CarouselPreview'

const Carousel = () => {
  const { shows } = useShowsContext()
  const [ currentPage, setCurrentPage ] = useState(0)
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const cardsPerPage = isMobile ? 1 : 4; // Display 1 card on mobile, 4 cards on larger screens
  const carouselContainerWidth = cardsPerPage * 250

  const handlePrevPage =()=>{
    if (currentPage === 0) {
      setCurrentPage(Math.ceil((shows.length || 0) / cardsPerPage) - 1);
    } else {
      setCurrentPage((prev)=>prev-1)
    }
  }
  const handleNextPage =()=>{
    if (currentPage >= Math.ceil((shows.length || 0) / cardsPerPage) - 1) {
      setCurrentPage(0);
    } else {
      setCurrentPage((prev)=>prev+1)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      handleNextPage();
    }, 3000); // Change page every 3 seconds
    return () => clearTimeout(timer); // Clean up on component unmount
  }, [currentPage]);

  return (
    <Container 
        sx={{mt: 10,
        display:'flex', 
        justifyContent:'center', 
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', 
        border: '1px solid ##A1CBFF', 
        borderRadius: '15px',
        backgroundColor: '#A1CBFF26' // 15% opacity
        }}>
      
      <IconButton
      onClick={handlePrevPage}
      sx={{margin: 4, color: '#DAD7E2'}}
      >
          <NavigateBeforeRounded />
      </IconButton>
      <Box sx={{ width: `${carouselContainerWidth}px`, height:"8%", margin:"auto", mb: 1 }}>
        <Typography variant="h4" component="div" sx={{ mb: 1, mt: 1, fontSize: 15, textAlign: 'center', fontStyle: 'italic', color: '#FFFFFF' }}>
          You may be interested in...
        </Typography>
        { shows.map((_, index) => (
          <Box key={`card-${index}`}
            sx={{
              width:"100%",
              height:"100%",
              display: currentPage === index ? "flex": "none" 
            }}
          >
            <Slide direction={"right"} in={ currentPage == index}>
              <Stack
                spacing={10}
                direction={"row"}
                justifyContent={"center"}
                alignContent={'center'}
                sx={{ width:"100%", height:"100%" }}
              >
                {
                  shows.slice(
                    index * cardsPerPage,
                    index * cardsPerPage + cardsPerPage)
                    .map((show: Show) => (
                      <Box key={show.id}>
                        <CarouselPreview {...show}/>
                      </Box>
                    ))
                }
              </Stack>
            </Slide>
          </Box>
        ))}
      </Box>
      <IconButton
      onClick={handleNextPage}
      sx={{margin: 4, color: '#DAD7E2'}}
      >
          <NavigateNextRounded />
      </IconButton>
    </Container> 
  )
}

export default Carousel