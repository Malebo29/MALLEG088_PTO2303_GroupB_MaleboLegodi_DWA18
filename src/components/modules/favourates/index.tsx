import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Chip, Collapse, Container, Divider, Typography } from '@mui/material'
import { FavoriteProps } from '../../../utils/type'
import { useState } from 'react'
import { useShowsContext } from '../../../context/ShowsContext';
import { supabase } from '../../../auth/supabase.service';
import { Store } from 'react-notifications-component';

const Favourate = (episode: FavoriteProps) => {
  const [readMore, setReadMore] = useState(false);
  const { favouriteEpisodes, setFavourites } = useShowsContext();

  const handleRemoveEpisode = async (
    episodeId: number,
    seasonId: number,
    showTitle: string
  ) => {
    let newFavorites = [...favouriteEpisodes];
    if (JSON.stringify(newFavorites).includes(JSON.stringify({ episodeId, seasonId, showTitle }))) {
      newFavorites = newFavorites.filter(id => id.episodeId !== { episodeId, seasonId, showTitle }.episodeId)
    } else {
      newFavorites.push({ episodeId, seasonId, showTitle });
    }

    const id = await (await supabase.auth.getUser()).data.user?.id

    const { error } = await supabase
      .from('user_favourates')
      .delete()
      .eq('showTitle', showTitle)
      .eq('seasonId', seasonId)
      .eq('episodeId', episodeId)
      .eq('userId', id)

    if (error) console.log(error.message)

    Store.addNotification({
      title: <Typography variant='h5'>You just removed {episode.episodeTitle} episode of {episode.showTitle} from Favourates</Typography>,
      type: 'info',
      container: 'center',
      message: 'Successfully removed favourates ',
      animationIn: ['animated', 'fadeIn'],
      animationOut: ['animated', 'fadeOut'],
      dismiss: { duration: 4000, onScreen: true },
    })

    const { data } = await supabase
      .from('user_favourates')
      .select()
      .eq('userId', id)

    if (error) throw new Error("Error: " + error.message)

    setFavourites(data)
    
  }
 
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: "center"}}>
      <Container maxWidth="sm">
        
        <Divider variant="middle">
            <Chip
              color="primary" 
              label={`Season: ${episode.seasonId}`} 
              size="small"
              sx={{ mt: 2, mb: 2, backgroundColor: "#2DD699", color: "#040736" }}
            />
        </Divider>

        <Card 
          sx={{
            maxWidth: 345,
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
            border: "1px solid #E7F1F9",
            borderRadius: "10px",
            backgroundColor: "#A1CBFF26",
            color: "#050A35"
          }}
        > 

          <CardHeader
            sx={{textAlign: 'center'}}
            title={episode.showTitle}
            subheader={episode.episodeTitle}
          />
          <Divider />
            <Typography variant='body2' sx={{mb: 1, mt: 1, textAlign: 'center', fontWeight: 'bold'}}>Updated: 
                 {new Date(episode.lastUpdatedShowDate).toLocaleDateString('en-GB',
                { year: 'numeric', month: 'long', day: 'numeric' })}</Typography>

          <CardMedia
                component="img"
                height="194"
                image={episode.seasonImage}
                alt={episode.seasonImage}
                sx={{ borderRadius: '2px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}
          />

          <CardContent>
                <Collapse in={readMore} collapsedSize={40}>
                  <Typography variant='body2'>{episode.episodeDescription}</Typography>
                </Collapse>

                <Button variant='text' sx={{color: '#050A35'}} onClick={() => setReadMore(!readMore)}>
                  {readMore ? 'Read Less' : 'Read More'}
                </Button>

                <Typography variant='body2'>Favoured Date:
                {new Date(episode.favouredDate).toLocaleDateString('en-GB',
                  { year: 'numeric', month: 'long', day: 'numeric' })}</Typography>
          </CardContent>
          <Divider />
          
          <CardActions>
            <Button sx={{color: '#050A35'}} onClick={() => handleRemoveEpisode(episode.episodeId, episode.seasonId, episode.showTitle)}>Remove Episode</Button>
          </CardActions>

        </Card>

      </Container>
    </Box>
  )
}
export default Favourate