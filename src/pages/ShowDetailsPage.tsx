import { useState, useEffect } from 'react';
import { Episode, ShowDetail } from '../utils/type';
import { useShowsContext } from '../context/ShowsContext';
import { Button, Select, MenuItem, FormControl, InputLabel, Container, Box, CardMedia, Typography, AppBar, Toolbar, Tooltip, styled } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getShow } from '../api'; // Import getShow
import { Favorite, FavoriteBorder, PauseCircle, PlayArrow } from '@mui/icons-material';
import { supabase } from '../auth/supabase.service';
import { Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css'
import 'react-h5-audio-player/lib/styles.css';
import AudioPlayer from '../components/audioPlayer/AudioPlayer';

const StyledFormControl = styled(FormControl)({
  '.MuiInputLabel-root': {
    color: "#040736",
  },
  '.MuiSelect-root': {
    color: "#040736",
  },
  '.MuiOutlinedInput-notchedOutline': {
    borderColor: "#040736",
  },
});

const ShowDetails = () => {
  const navigate = useNavigate();
  const { playerRef } = useShowsContext()
  const { showId } = useParams<{ showId: string }>();
  const { selectedSeason, setSelectedSeason } = useShowsContext();
  const [show, setShow] = useState<ShowDetail | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [ currentFile, setCurrentFile ] = useState<Episode | null>(null)
  const [playProgress, setPlayProgress] = useState<{[id: string]: number}>({})
  const [loading, setLoading] = useState(true);
  const [playStatus, setPlayStatus] = useState(false);


  const handleAddToFavourates = async (
    episodeId: number,
    episodeTitle: string,
    episodeDescription: string,
    seasonId: number,
    seasonImage: string,
    showTitle: string,
    lastUpdatedShowDate: string,
  ) => {
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

    if (error) console.log(error.message)

    Store.addNotification({
      title: <Typography variant='h5'>Add to Favourates</Typography>,
      type: 'success',
      container: 'center',
      message: 'Added successfully to favourates ',
      animationIn: ['animated', 'fadeIn'],
      animationOut: ['animated', 'fadeOut'],
      dismiss: { duration: 4000, onScreen: true },
    })
  }

  
  const handlePlayEpisode = async(file: Episode)=>{
    const userId = await (await supabase.auth.getUser()).data.user?.id 

    if(playerRef.current && currentFile){
      setPlayProgress({
        ...playProgress,
        [currentFile.episode]: playerRef.current.currentTime
      })

      playerRef.current.pause();
      playerRef.current.currentTime = 0; //rest playertime
      playerRef.current.volume = 0.7;

      console.log( playProgress )
      //Update user listening history
      const { error } = await supabase
        .from('user_history')
        .upsert({
          episodeId: file.episode,
          episodeTitle: file.title,
          playProgress: playProgress[file.episode+1],
          playStatus: playStatus ? "Finished": "In Progress",
          userId
        })

      if(error) console.log("Error updating user listening history", error)
    }

    setCurrentFile(file)
    playerRef.current?.play()
    playerRef.current.addEventListener('ended', ()=> setPlayStatus(true))
    playerRef.current.addEventListener('pause', ()=> setPlayStatus(false))
   
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

  if (loading || !show) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="sm" sx={{ pt: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

      <Button variant='outlined' onClick={() => navigate(-1)}>Go Back</Button>
      <Box sx={{ textAlign: 'center' }}>
        <h1>{show.title}</h1>
        <CardMedia
          component="img"
          image={show.image}
          alt={show.title}
          sx={{ width: '100%', height: 'auto', borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}
        />
        <p>{show.description}</p>

        <StyledFormControl variant="outlined">
          <InputLabel id="season-select-label" shrink>Season:</InputLabel>
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
        </StyledFormControl>

        <h2>Season {selectedSeason} ({show.seasons[selectedSeason].episodes.length} episodes)</h2>
        {show.seasons[selectedSeason].episodes.map(episode => <div key={episode.episode}>
          <h3>
            Episode {episode.episode}: {episode.title}
          </h3>
          <p>{episode.description}</p>

            <Button
              startIcon={true ? <PlayArrow sx={{ color: "#2DD699" }} /> : <PauseCircle />}
              onClick={() => handlePlayEpisode(episode)}
            >
              Listen
            </Button>

          <Tooltip title={true ? "Remove from your favourates" : "Add to your favourates"}>
            <Button
              startIcon={true ? <Favorite sx={{ color: "#2DD699" }} /> : <FavoriteBorder />}
              onClick={() => handleAddToFavourates(episode.episode, episode.title,
                episode.description, selectedSeason, show.seasons[selectedSeason].image,
                show.title, show.updated.toString())}
            >
            </Button>
          </Tooltip>
        </div>)}

      </Box>
      
      <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar sx={{display: 'flex', flexDirection:'column', justifyContent:'space-between', alignItems:'center'}}>
          <marquee>{currentFile?.title}</marquee>
          <AudioPlayer audioRef={playerRef} audioFile={currentFile ? currentFile : {
            title: '',
            description: '',
            episode: 0,
            file: ''
          }} />
        </Toolbar>
      </AppBar>
    </Container>


  );
};

export default ShowDetails;