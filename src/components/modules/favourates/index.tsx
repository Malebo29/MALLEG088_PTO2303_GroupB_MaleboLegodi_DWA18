import { Box, Button, ButtonGroup, Chip, Container, Typography } from '@mui/material'
import React from 'react'

const Favourite = () =>{
    return (
        <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
            <Chip label={'Season: 6'}/>
            <Typography variant='h6'>Show name</Typography>
            <Typography variant='h6'>Season name</Typography>
            <Typography variant='body2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Typography>
            <Box sx={{display:'flex', justifyContent:'space-between'}}>
                <Button>Play</Button>
                <Typography variant='body2'>Updated date of show</Typography>
            </Box>
            <Box sx={{display:'flex', justifyContent:'space-between'}}>
                <Button>Remove</Button>
                <Typography variant='body2'>Added to favourates date</Typography>
            </Box>
        </Box>
    )
}

const Favourates = () => {
  return (
    <Container>
        {/* map through favourites and return each card  */}
    </Container>
  )
}

export default Favourates