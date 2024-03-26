import { useState } from 'react';
import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Switch, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Settings = () => {
  const [autoPlay, setAutoPlay] = useState(false);
  const [notifications, setNotifications] = useState(false);

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
              checked={notifications}
              onChange={handleNotificationsChange}
            />
          }
          label="Allow Notifications"
        />
        <Typography variant="body2">Get updates on your favourite shows</Typography>
        <Button variant="contained">Reset</Button>
        <Typography variant="body2">Reset tooltips for various elements of the App</Typography>
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