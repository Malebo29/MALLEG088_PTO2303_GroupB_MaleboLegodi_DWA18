import { Box, Button, CardMedia, Chip, Typography } from '@mui/material'
import { FavoriteProps } from '../../../utils/type'

const Favourate = (episode: FavoriteProps) =>{   
    return (
        <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
            <Chip label={`Season: ${episode.seasonId}`}/>
            <CardMedia
                component="img"
                image={episode.seasonImage}
                alt={episode.seasonImage}
                sx={{ width: '20%', height: 'auto', borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}
            />
            <Typography variant='h6'>{episode.showTitle}</Typography>
            <Typography variant='h6'>{episode.episodeTitle}</Typography>
            <Typography variant='body2'>{episode.episodeDescription}</Typography>
            <Box sx={{display:'flex', justifyContent:'space-between'}}>
                <Button>Play</Button>
                <Typography variant='body2'>{episode.lastUpdatedShowDate}</Typography>
            </Box>
            <Box sx={{display:'flex', justifyContent:'space-between'}}>
                <Button>Remove</Button>
                <Typography variant='body2'>{episode.favoredDate}</Typography>
            </Box>
        </Box>
    )
}

export default Favourate