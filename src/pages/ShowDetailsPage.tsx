import { useState, useEffect } from 'react';
import { Episode, FavoriteEpisodes, ShowDetail } from '../utils/type';
import { useShowsContext } from '../context/ShowsContext';
import { Button, Select, MenuItem, FormControl, InputLabel, Container, Box, CardMedia, Typography, AppBar, Toolbar, Tooltip, styled } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getShow } from '../api'; // Import getShow
import { Favorite, FavoriteBorder, PauseCircle, PlayArrow, UndoRounded } from '@mui/icons-material';
import { supabase } from '../auth/supabase.service';
import { Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css'
import 'react-h5-audio-player/lib/styles.css';
import AudioPlayer from '../components/audioPlayer/AudioPlayer';
import Marquee from "react-fast-marquee";

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
  const { loading, setLoading, selectedSeason, setSelectedSeason } = useShowsContext();
  const [show, setShow] = useState<ShowDetail | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [currentFile, setCurrentFile] = useState<Episode | null>(null)
  const [playProgress, setPlayProgress] = useState<{ [id: string]: number }>({})
  const [playStatus, setPlayStatus] = useState(false);
  const { favouriteEpisodes, setFavouriteEpisodes } = useShowsContext();

  console.log(episodes)
  // console.log(favouriteEpisodes)

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

  const handleRemoveFavourates = async (
    episodeId: number,
    seasonId: number,
    showTitle: string
  ) => {
    const { error } = await supabase
      .from('user_favourates')
      .delete()
      .eq('showTitle', showTitle)
      .eq('seasonId', seasonId)
      .eq('episodeId', episodeId)
      .eq('userId', (await supabase.auth.getUser()).data.user?.id)

    if (error) console.log(error.message)

    Store.addNotification({
      title: <Typography variant='h5'>Removed from Favourates</Typography>,
      type: 'info',
      container: 'center',
      message: 'Successfully removed favourates ',
      animationIn: ['animated', 'fadeIn'],
      animationOut: ['animated', 'fadeOut'],
      dismiss: { duration: 4000, onScreen: true },
    })

  }

  const handlePlayEpisode = async (file: Episode) => {
    const userId = await (await supabase.auth.getUser()).data.user?.id

    if (playerRef.current && currentFile) {
      setPlayProgress({
        ...playProgress,
        [currentFile.episode]: playerRef.current.currentTime
      })

      playerRef.current.pause();
      playerRef.current.currentTime = 0;
      playerRef.current.volume = 0.7;

      const { error } = await supabase
        .from('user_history')
        .upsert({
          episodeId: file.episode,
          episodeTitle: file.title,
          playProgress: playProgress[file.episode + 1],
          playStatus: playStatus ? "Finished" : "In Progress",
          userId
        })

      if (error) console.log("Error updating user listening history", error)
    }

    setCurrentFile(file)
    playerRef.current?.play()
    playerRef.current.addEventListener('ended', () => setPlayStatus(true))
    playerRef.current.addEventListener('pause', () => setPlayStatus(false))
  }

  useEffect(() => {
    const fetchShow = async () => {
      setLoading(true);
      const showData = await getShow(showId!);
      setShow(showData);
      if (showData && showData.episodes) {
        // console.log('selectedSeason:', selectedSeason);

        const seasonEpisodes = showData.episodes.filter((episode: { season: number; }) => {
          // console.log('episode.season:', episode.season);

          return episode.season === selectedSeason;
        });
        setEpisodes(seasonEpisodes);
      }
      setLoading(false);
    };
    fetchShow();
  }, [showId, selectedSeason]);

  useEffect(() => {
    const fetchFavourites = async () => {
      const userId = await (await supabase.auth.getUser()).data.user?.id
      // console.log(userId)
      const { data, error } = await supabase
        .from('user_favourates')
        .select('episodeId, seasonId, showTitle')
        .eq('userId', userId)

      if (error) console.log(error)
      // console.log(data)
      setFavouriteEpisodes(data!)
    }

    fetchFavourites()


  }, [])


  if (loading || !show) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="sm" sx={{ pt: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Button
        variant='outlined'
        startIcon={<UndoRounded sx={{ color: "#2DD699" }} />}
        onClick={() => navigate(-1)}
        sx={{ border: "1px solid #2DD699", color: '#040736', marginRight: "10px" }}>
        Go Back
      </Button>

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

          <Typography
            sx={{ fontSize: 12, color: "#050A35", textAlign: "center" }}
            variant="body2"
            color="text.secondary"
          >
            {episode.description.slice(0, 90) + "..."}
          </Typography>

          <Button
            startIcon={true ? <PlayArrow sx={{ color: "#2DD699" }} /> : <PauseCircle />}
            onClick={() => handlePlayEpisode(episode)}
            sx={{ border: "1px solid #2DD699", color: '#040736', marginRight: "10px" }}>
            Listen
          </Button>

          <Tooltip title={favouriteEpisodes.some((fav: FavoriteEpisodes) => fav.episodeId !== episode.episode) ? "Remove from your favourates" : "Add to your favourates"}>
            <Button
              startIcon={JSON.stringify(favouriteEpisodes).includes(JSON.stringify({ episodeId: episode.episode, seasonId: selectedSeason, showTitle: show.title })) ? <Favorite sx={{ color: "#2DD699" }} /> : <FavoriteBorder />}
              onClick={JSON.stringify(favouriteEpisodes).includes(JSON.stringify({ episodeId: episode.episode, seasonId: selectedSeason, showTitle: show.title })) ? () => handleRemoveFavourates(episode.episode, selectedSeason, show.title)
                : () => handleAddToFavourates(episode.episode, episode.title,
                  episode.description, selectedSeason, show.seasons[selectedSeason].image,
                  show.title, show.updated.toString())}
              sx={{ border: "1px solid #2DD699", color: '#040736' }}
            > Add to Favourites
            </Button>
          </Tooltip>
        </div>)}
      </Box>

      <AppBar position="fixed" color="primary" sx={{ backgroundColor: '#040736', top: 'auto', bottom: 0, padding: "10px" }}>
        <Toolbar sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
          <Marquee>{currentFile?.title}</Marquee>
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
}

export default ShowDetails;