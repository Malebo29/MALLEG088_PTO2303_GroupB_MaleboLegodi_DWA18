import { useState } from 'react';
import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Switch, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const UserProfileForm = () => {
  const [playbackSpeed, setPlaybackSpeed] = useState('1.0');
  const [autoDownload, setAutoDownload] = useState(false);
  const [notifications, setNotifications] = useState(false);

  const handlePlaybackSpeedChange = (event) => {
    setPlaybackSpeed(event.target.value);
  };

  const handleAutoDownloadChange = (event) => {
    setAutoDownload(event.target.checked);
  };

  const handleNotificationsChange = (event) => {
    setNotifications(event.target.checked);
  };

  return (
    <Box sx={{ mt: 4, mb: 4, width: '80%', margin: '0 auto' }}>
      <Typography variant="h4" align="center">User Profile</Typography>

      {/* Logout Option */}
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" color="secondary">Logout</Button>
      </Box>

      {/* Notifications */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">Notifications</Typography>
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
          label="Notifications"
        />
      </Box>

      {/* My Favourites */}
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" component={Link} to="/favourites">Manage My Favourites</Button>
      </Box>

      {/* Settings */}
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" component={Link} to="/settings">Settings</Button>
      </Box>
    </Box>
  );
};

export default UserProfileForm;