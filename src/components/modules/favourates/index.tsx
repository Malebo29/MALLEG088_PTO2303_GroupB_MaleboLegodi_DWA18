import { Box, Button, CardMedia, Chip, Collapse, Divider, Typography } from '@mui/material'
import { FavoriteProps } from '../../../utils/type'
import { useState } from 'react'
import { useShowsContext } from '../../../context/ShowsContext';
import { supabase } from '../../../auth/supabase.service';
import { Store } from 'react-notifications-component';

const Favourate = (episode: FavoriteProps) =>{  
    const [readMore, setReadMore] = useState(false);
    const { favouriteEpisodes , setFavourites} = useShowsContext();

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

          if(error) throw new Error("Error: "+ error.message)

          setFavourites(data)

      }

    return (
        <Box sx={{display:'flex', flexDirection:'column', alignItems: 'center' }}>
            <Divider /> {<Chip label={`Season: ${episode.seasonId}`} sx={{ alignSelf: 'center' }}/>}  <Divider />
            <Typography variant='h6'>{episode.showTitle}</Typography>
            <Typography variant='h6'>{episode.episodeTitle}</Typography>
            <Divider />

            <Box sx={{display:'flex', flexDirection:'row'}}>

                <Box sx={{display:'flex', flexDirection:'row'}}>
                <CardMedia
                    component="img"
                    image={episode.seasonImage}
                    alt={episode.seasonImage}
                    sx={{ width: '20%', height: 'auto', borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}
                />
                </Box>
                
                <Box>
                    <Collapse in={readMore} collapsedSize={140}>
                    <Typography variant='body2'>{episode.episodeDescription}</Typography>
                    </Collapse>

                    <Button onClick={() => setReadMore(!readMore)}>
                        {readMore ? 'Read Less' : 'Read More'}
                    </Button>
                </Box>
            </Box>

            <Box sx={{display:'flex', flexDirection: 'column', justifyContent:'space-between', width: '100%'}}>
            
            <Box sx={{display:'flex', justifyContent:'space-between', width: '100%'}}>
                <Typography variant='body2'>Updated: 
                    {new Date(episode.lastUpdatedShowDate).toLocaleDateString('en-GB', 
                    { year: 'numeric', month: 'long', day: 'numeric' })}</Typography>
                    <Typography variant='body2'>Favoured Date: 
                    {new Date(episode.favoredDate).toLocaleDateString('en-GB',
                    { year: 'numeric', month: 'long', day: 'numeric' })}</Typography>
            </Box>

            <Box sx={{display:'flex', justifyContent:'space-between', width: '100%'}}>
                <Button onClick={() => handleRemoveEpisode(episode.episodeId, episode.seasonId, episode.showTitle)}>Remove</Button>
            </Box>
        </Box>
        </Box>


    )
}

export default Favourate