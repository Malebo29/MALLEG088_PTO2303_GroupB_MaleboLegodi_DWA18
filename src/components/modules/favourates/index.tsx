import { Box, Button, CardMedia, Chip, Collapse, Typography } from '@mui/material'
import { FavoriteProps } from '../../../utils/type'
import { useState } from 'react'

const Favourate = (episode: FavoriteProps) =>{   
    const [readMore, setReadMore] = useState(false);

    return (
        <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
            <Chip label={`Season: ${episode.seasonId}`} sx={{ alignSelf: 'center' }}/>
            <Box sx={{display:'flex', flexDirection:'row'}}>
                <CardMedia
                    component="img"
                    image={episode.seasonImage}
                    alt={episode.seasonImage}
                    sx={{ width: '20%', height: 'auto', borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}
                />
            </Box>

            <Box sx={{display:'flex', flexDirection:'column', ml: 2}}>
                <Typography variant='h6'>{episode.showTitle}</Typography>
                <Typography variant='h6'>{episode.episodeTitle}</Typography>
                <Collapse in={readMore} collapsedSize={140}>
                    <Typography variant='body2'>{episode.episodeDescription}</Typography>
                </Collapse>

                <Button onClick={() => setReadMore(!readMore)}>
                    {readMore ? 'Read Less' : 'Read More'}
                </Button>
            </Box>

            <Box sx={{display:'flex', justifyContent:'space-between', width: '100%'}}>
                <Button>Play</Button>
                <Typography variant='body2'>Updated: 
                    {new Date(episode.lastUpdatedShowDate).toLocaleDateString('en-GB', 
                    { year: 'numeric', month: 'long', day: 'numeric' })}</Typography>
            </Box>

            <Box sx={{display:'flex', justifyContent:'space-between', width: '100%'}}>
                <Button>Remove</Button>
                <Typography variant='body2'>Favoured Date: 
                    {new Date(episode.favoredDate).toLocaleDateString('en-GB',
                    { year: 'numeric', month: 'long', day: 'numeric' })}</Typography>
            </Box>
        </Box>
    )
}

export default Favourate