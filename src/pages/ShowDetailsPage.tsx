import { useState, useEffect } from 'react';
import { Episode, FavoriteProps, ShowDetail } from '../utils/type';
import { useShowsContext } from '../context/ShowsContext';
import { Button, Select, MenuItem, FormControl, InputLabel, Container, Box, CardMedia, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getShow } from '../api'; // Import getShow
import { Favorite } from '@mui/icons-material';
import { supabase } from '../auth/supabase.service';
import { Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css'

const ShowDetails = () => {
  const navigate = useNavigate();
  const { showId } = useParams<{ showId: string }>();
  const { selectedSeason, setSelectedSeason } = useShowsContext();
  const [show, setShow] = useState<ShowDetail | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([])

  const [loading, setLoading] = useState(true);
  
  const handleAddToFavourates = async (
      episodeId: number, 
      episodeTitle: string, 
      episodeDescription: string,
      seasonId: number,
      seasonImage: string,
      showTitle: string,
      lastUpdatedShowDate: string,
      )=>{
      const { error } = await supabase
      .from('user_favourates')
      .insert([{
        episodeId: episodeId,
        episodeTitle: episodeTitle,
        episodeDescription: episodeDescription,
        seasonId: seasonId,
        seasonImage,
        showTitle: showTitle,
        lastUpdatedShowDate: lastUpdatedShowDate,
        userId: (await supabase.auth.getUser()).data.user?.id
      }])

      if(error) console.log(error.message)
      
      Store.addNotification({
        title: <Typography variant='h5'>Add to Favourates</Typography>,
        type:'success',
        container: 'center',
        message:'Added successfully to favourates ',
        animationIn: ['animated', 'fadeIn'],
        animationOut: ['animated', 'fadeOut'],
        dismiss: {duration: 4000, onScreen: true},
      })
  }


  useEffect(() => {
    const fetchShow = async () => {
      setLoading(true);
      const showData = await getShow(showId!); // Fetch show data
      
      console.log('showId:', showId)
      
      setShow(showData);
      if (showData && showData.episodes) {

        console.log('selectedSeason:', selectedSeason);

        const seasonEpisodes = showData.episodes.filter((episode: { season: number; }) => {

          console.log('episode.season:', episode.season);

          return episode.season === selectedSeason;
        });
        setEpisodes(seasonEpisodes);
      }
      setLoading(false);
    };

    fetchShow();
  }, [showId, selectedSeason]);

  if (loading || !show ) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Button onClick={() => navigate(-1)}>Go Back</Button>
      <Box sx={{ my: 2, textAlign: 'center' }}>
        <h1>{show.title}</h1>
        <CardMedia
          component="img"
          image={show.image}
          alt={show.title}
          sx={{ width: '100%', height: 'auto', borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}
        />
        <p>{show.description}</p>
        <FormControl>
          <InputLabel id="season-select-label">Season:</InputLabel>
          <Select
              labelId="season-select-label"
              id="season-select"
              value={selectedSeason}
              onChange={(event) => setSelectedSeason(Number(event.target.value))}
            >
              {show.seasons.map((_season, index) => (
                <MenuItem key={index} value={index + 1}>
                  Season {index + 1}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <h2>Season {selectedSeason} ({show.seasons[selectedSeason].episodes.length} episodes)</h2>
        { show.seasons[selectedSeason].episodes.map(episode => <div key={episode.episode}>
          <h3>
            Episode {episode.episode}: {episode.title}
          </h3>
          <p>{episode.description}</p>

          <Button
            startIcon={true ? <Favorite sx={{color: "gray"}} /> : <Favorite />}
            onClick={()=>handleAddToFavourates(episode.episode, episode.title,
               episode.description, selectedSeason, show.seasons[selectedSeason].image,
               show.title, show.updated.toString() )}
          >
          </Button>

          <audio controls={true} preload='true'><source src={episode.file} /></audio>
          {/* <audio ref={audioRef} controls={true} preload='true'><source src={episode.file} /></audio> */}
        </div>) }
      
      </Box>
    </Container>
  );
};

export default ShowDetails;