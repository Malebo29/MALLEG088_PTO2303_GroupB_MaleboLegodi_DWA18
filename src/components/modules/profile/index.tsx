import { Box, Button, FilledInput, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, Radio, RadioGroup, Switch, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const UserProfileForm = () => {

  return (
    <Box sx={{ mt: 4, mb: 4, width: '80%', margin: '0 auto' }}>
      <Typography variant="h4" align="center">User Profile</Typography>

      <form>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ mt: 2 }}>
              <FormControl variant="filled" fullWidth>
                <InputLabel htmlFor="component-filled">First Name</InputLabel>
                <FilledInput />
              </FormControl>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box sx={{ mt: 2 }}>
              <FormControl variant="filled" fullWidth>
                <InputLabel htmlFor="component-filled">Last Name</InputLabel>
                <FilledInput />
              </FormControl>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 2 }}>
            <Button variant="contained" type='submit'>Save</Button>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="secondary">Reset Password</Button>
        </Box>
        
      </form>

      {/* My Favourites */}
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" component={Link} to="/favourites">Manage My Favourites</Button>
      </Box>

      {/* Settings */}
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" component={Link} to="/settings">Manage Settings</Button>
      </Box>
    </Box>
  );
};

export default UserProfileForm;