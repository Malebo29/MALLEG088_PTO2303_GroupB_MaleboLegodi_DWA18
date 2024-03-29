import { useState } from 'react';
import { Avatar, Box, Button, Container, Divider, FormControl, FormControlLabel, FormLabel, List, ListItem, ListItemText, Radio, RadioGroup, Switch, Tooltip, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useShowsContext } from '../../../context/ShowsContext';
import { KeyboardArrowRight } from '@mui/icons-material';

const Settings = () => {
  const navigate = useNavigate();
  const [autoPlay, setAutoPlay] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState('1.0');

  const { playerRef }=  useShowsContext();

  playerRef.autoplay = autoPlay;
  playerRef.playBackSpeed = playbackSpeed;
  
  const handlePlaybackSpeedChange = (event) => {
    setPlaybackSpeed(event.target.value);
  };

  const handleAutoPlayChange = (event) => {
    setAutoPlay(event.target.checked);
  };

  const handleNotificationsChange = (event) => {
    setNotifications(event.target.checked);
  };

  return (

    <Box maxWidth="sm" sx={{ pt: '100px', display: 'flex', flexDirection: 'column' }}>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Button variant='outlined' onClick={() => navigate(-1)}>Go Back</Button>
        <Typography variant="h4" align="center" sx={{ mt: 2, mb: 2, fontWeight: 'bold' }}>My Settings</Typography>
      </Box>

      <Divider />  
      <Box sx={{ m: 2 }}>
      <Typography variant="h6">My profile:</Typography> 
        <Box>
          <Avatar>ML</Avatar>
          <Typography variant="h4" sx={{ fontSize: '2rem' }}>Malebo Legodi</Typography>
        </Box>
        <Button variant="contained" color="secondary" component={Link} to="/">Logout</Button>
      </Box>

    <Box>
    <Divider />  
      <Box sx={{ m: 2 }}>
        <Typography variant="h6">General:</Typography>
        
        <FormControlLabel
          control={
            <Switch
              checked={autoPlay}
              onChange={handleAutoPlayChange}
            />
          }
          label="Auto Play Next Episode"
        />

        <FormControlLabel
          control={
            <Switch
              checked={notifications}
              onChange={handleNotificationsChange}
            />
          }
          label="Allow Notifications"
        />
      </Box>

           {/* Playback speed box */}
      <Divider />  
      <Box sx={{ m: 2 }}>   
          <FormControl component="fieldset">
            <FormLabel component="legend">Playback Speed</FormLabel>
            <RadioGroup
              aria-label="playback-speed"
              value={playbackSpeed}
              onChange={handlePlaybackSpeedChange}
            >
              <FormControlLabel value="0.5" control={<Radio />} label="0.5x" />
              <FormControlLabel value="1.0" control={<Radio />} label="1.0x" />
              <FormControlLabel value="1.5" control={<Radio />} label="1.5x" />
              <FormControlLabel value="2.0" control={<Radio />} label="2.0x" />
            </RadioGroup>
          </FormControl>
      </Box>
       
      <Divider />  
      <Box sx={{ m: 2 }}>
        <Box>
        <Tooltip title="View your listening history." >
        <Button variant="contained" component={Link} to="/history">My Listening History<KeyboardArrowRight /></Button>
        </Tooltip>
        </Box>

        <Box sx={{ mt: 2, mb: 2 }}>
        <Tooltip title="Your tailored experience: Manage your favorites shows for personalised recommendations.">
          <Button variant="contained" component={Link} to="/favourites">Favourates Management <KeyboardArrowRight /></Button>
        </Tooltip>
        </Box>
      </Box>

      {/* About */}
      <Divider />  
      <Box sx={{ m: 2 }}>
        <Typography variant="h6">About:</Typography>
        <Typography variant="body2">App Version: 1.0.0</Typography>
        <Typography variant="body2">
          Need help? Visit our <Link to="https://www.codespace.co.za/programs/">help center</Link> via Codespace.
        </Typography>
      </Box>
    </Box>
  </Box>

  );
};

export default Settings;