import { Show } from '../../utils/type'
import { Card, CardMedia, CardContent, Typography, Stack, Chip } from '@mui/material'

const genreMap = {
    "1":	"Personal Growth",
    "2":	"True Crime and Investigative Journalism",
    "3":	"History",
    "4":	"Comedy",
    "5":	"Entertainment",
    "6":	"Business",
    "7":	"Fiction",
    "8":	"News",
    "9":	"Kids and Family"
}

export const ShowPreview = (show: Show) => {
    return (
        <Card sx={{ maxWidth: 345, 
                boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', 
                border: '1px solid #E7F1F9', 
                borderRadius: '10px',
                backgroundColor: '#E7F1F9' }}>
    
            <CardMedia
                component="img"
                sx={{ height: 140, objectFit: 'contain' }}
                image={show.image}
                title={show.title}
            />
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography sx={{ fontSize: 15, color: '#050A35' }} gutterBottom variant="h5" component="div">
                    {show.title}
                </Typography>
    
                <Stack sx={{ mb: 1 }} direction="row" spacing={1}>
                    <Chip color="primary" label={`Seasons: ${show.seasons}`} size="small" sx={{backgroundColor: '#2DD699', color: '#040736'}}/>
                </Stack>
    
                <Typography
                    sx={{ fontSize: 12, color: '#050A35' }} 
                    variant="body2"
                    color="text.secondary"                
                    >
                    {show.description.slice(0, 85)+"..."}
                </Typography>
    
                <fieldset style={{ width: "80%", display: 'flex', color: '#040736', border: '2px solid #040736' }}>
                    <legend><b>Genres&nbsp;</b></legend>
                    <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
                        {show.genres.map((genre: number)=> <Chip label={Object.values(genreMap)[genre-1]} size="small" sx={{ fontSize: 10, backgroundColor: '#A1CBFF56', color: '#040736' }} />)}
                    </Stack>
                </fieldset>
    
                <Typography sx={{ mt: 1, fontSize: 12, color: '#050A35' }}>
                Updated:&nbsp;{new Date(show.updated).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
                </Typography>
            </CardContent>
        </Card>
      )
}