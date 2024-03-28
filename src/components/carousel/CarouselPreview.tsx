import { Show } from '../../utils/type'
import { Card, CardActionArea, CardContent, CardMedia, Chip, Stack, Typography } from '@mui/material'

export const CarouselPreview = (show: Show) => {
    const title = show.title.length > 15 ? show.title.substring(0, 15) + '...' : show.title

  return (
    <Card sx={{ maxWidth: 345,
                border: "1px solid #E7F1F9",
                borderRadius: "10px",
                backgroundColor: "#E7F1F9"
            }}>
       <CardActionArea>
       <CardMedia
                component="img"
                sx={{ height: 140}}
                image={show.image}
                // title={show.title}
        />

        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                
                <Typography gutterBottom variant="body2" sx={{ fontSize: 12, textAlign: 'center', color: '#050A35' }} component="div">
                    {show.title.slice(0, 15)+"..."}
                </Typography>
    
                <Stack sx={{ mt: 1 }} direction="row" spacing={1}>
                    <Chip color="primary" label={`Seasons: ${show.seasons}`} size="small" sx={{backgroundColor: '#2DD699', color: '#040736'}}/>
                </Stack>
        </CardContent>
       </CardActionArea>
                
                
    </Card>
  )
}
