import { useState } from 'react';
import { Avatar, Box, Button, Card, CardContent, Container, Divider,  FormControlLabel, Paper, Switch, Tooltip, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useShowsContext } from '../../../context/ShowsContext';
import { ArrowBack, Bookmarks, KeyboardArrowRight, ManageHistory } from '@mui/icons-material';
import { supabase } from '../../../auth/supabase.service';
import Cookies from 'js-cookie';

const Settings = () => {
  const navigate = useNavigate();

  const { token } = useShowsContext()
  const fullName = token?.user.user_metadata.first_name + " " + token?.user.user_metadata.last_name;
  
  const [autoPlay, setAutoPlay] = useState(false);
  const [notifications, setNotifications] = useState(false);
  
  const { playerRef, setToken }=  useShowsContext();

  playerRef.autoplay = autoPlay;

  const handleAutoPlayChange = (event: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
    setAutoPlay(event.target.checked);
  };

  const handleNotificationsChange = (event: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
    setNotifications(event.target.checked);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    Cookies.remove("_streamerSession");
    setToken(null);
    navigate('/');
  };
  
  return (

  <Box minHeight="100vh" sx={{ pt: '100px', display: 'flex', flexDirection: 'column', alignItems: "center"}}>
    <Container maxWidth="sm"> 
      <Box sx={{ pt: '10px', display: 'flex', flexDirection: 'column', alignItems: "center" }}>
      
          <Button
                variant='outlined'
                startIcon={<ArrowBack sx={{ color: "#2DD699" }} />}
                onClick={() => navigate(-1)}
                sx={{ border: "1px solid #2DD699", color: '#040736', marginRight: "10px" }}>
                Go Back
          </Button>
          
          <Typography variant="h4" align="center" sx={{ mt: 2, mb: 2, fontWeight: 'bold' }}>Dashboard</Typography>



        <Card sx={{ width: '100%'}}>
          <CardContent>
          <Typography variant="h6" sx={{ mb: 2, textTransform: 'uppercase', fontWeight: 'bold' }}>My profile:</Typography> 
          <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <Avatar src={'/2.jpg'} alt={ fullName } sx={{ backgroundColor: '#E7F1F9', height: '60px', width: '60px'}}/>
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Typography variant="h4" sx={{ fontSize: '1.2rem' }}>{fullName}</Typography>
                <Button variant="contained" color="secondary" component={Link} to="/"
                onClick={() => { handleSignOut() }}
                >Sign Out</Button>
              </Box>
          </Box>
          </CardContent>
        </Card>

        <Divider sx={{ my: 2 }}/>  
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
        
        <Divider sx={{ my: 1 }}/>  

        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: "center" }}>
          <Paper variant="outlined" sx={{ p: 1, mb: 2, width: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <ManageHistory />
                      <Tooltip title="View your listening history." >
                      <Button variant="text" component={Link} to="/history">My Listening History</Button>
                      </Tooltip>
                  <KeyboardArrowRight />
                </Box>

                    <Divider sx={{ my: 1 }} />

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Bookmarks />
                    <Tooltip title="Your tailored experience: Manage your favorites shows for personalised recommendations.">
                      <Button variant="text" component={Link} to="/favourates">Favourates Management</Button>
                    </Tooltip>
                  <KeyboardArrowRight />
                </Box>
            </Paper>
        </Container>


        <Divider sx={{ my: 1 }}/>  
            <Box>
              <Typography variant="h6">About:</Typography>
              <Typography variant="body2">App Version: 1.0.0</Typography>
              <Typography variant="body2">
                Need help? Visit our <Link to="https://www.codespace.co.za/programs/">help center</Link> via Codespace.
              </Typography>
            </Box>
          <Divider sx={{ my: 1 }}/>
        </Box>
    </Container>
</Box>

) }

export default Settings;