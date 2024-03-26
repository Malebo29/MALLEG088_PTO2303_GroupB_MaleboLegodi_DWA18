import { useState } from 'react';
import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Switch, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Settings = () => {
  const [autoPlay, setAutoPlay] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState('1.0');
  const [autoDownload, setAutoDownload] = useState(false);

  const handlePlaybackSpeedChange = (event) => {
    setPlaybackSpeed(event.target.value);
  };

  const handleAutoDownloadChange = (event) => {
    setAutoDownload(event.target.checked);
  };

  const handleAutoPlayChange = (event) => {
    setAutoPlay(event.target.checked);
  };

  const handleNotificationsChange = (event) => {
    setNotifications(event.target.checked);
  };

  return (
    <Box sx={{ mt: 4, mb: 4, width: '80%', margin: '0 auto' }}>
      <Typography variant="h4" align="center">My Settings</Typography>

      {/* Account */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">Account:</Typography>
        <Button variant="contained" component={Link} to="/manage-devices">Manage Devices</Button>
        <Button variant="contained" color="secondary">Logout</Button>
      </Box>

      {/* General */}
      <Box sx={{ mt: 2 }}>
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
              checked={autoDownload}
              onChange={handleAutoDownloadChange}
            />
          }
          label="Auto Download"
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

        <Typography variant="body2">Get updates on your favourite shows</Typography>
      </Box>

           {/* Playback speed box */}
        <Box sx={{ mt: 2 }}>
        
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

      <Box sx={{ mt: 2 }}>
        <Tooltip title="Reset your progress which will remove all your listening history">
            <Button variant="contained">Reset</Button>
        </Tooltip>
      </Box>


      {/* My Favourites */}
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" component={Link} to="/favourites">Manage My Favourites</Button>
      </Box>

      {/* About */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">About:</Typography>
        <Typography variant="body2">App Version: 1.0.0</Typography>
        <Button variant="contained" component={Link} to="/terms">Terms and Conditions</Button>
      </Box>
    </Box>
  );
};

export default Settings;