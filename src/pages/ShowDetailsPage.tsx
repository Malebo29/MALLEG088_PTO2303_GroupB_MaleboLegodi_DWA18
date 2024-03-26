import { useState, useEffect } from 'react';
import { Episode, ShowDetail } from '../utils/type';
import { useShowsContext } from '../context/ShowsContext';
import { Button, Select, MenuItem, FormControl, InputLabel, Container, Box, CardMedia } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getShow } from '../api'; // Import getShow
import { Favorite } from '@mui/icons-material';

const ShowDetails = () => {
  const navigate = useNavigate();
  const { showId } = useParams<{ showId: string }>();
  const { selectedSeason, setSelectedSeason } = useShowsContext();
  const [show, setShow] = useState<ShowDetail | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  const [loading, setLoading] = useState(true);
  

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
            startIcon={<Favorite />}
            onClick={() => {
              // handle favourite
            }}
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