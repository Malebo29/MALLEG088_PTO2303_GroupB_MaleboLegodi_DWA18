import { AppBar, Toolbar, IconButton, Avatar, Menu, MenuItem, Box } from '@mui/material';
import Logo from '../../assets/android-chrome-144x144.png';
import { supabase } from "../../auth/supabase.service";
import { useNavigate } from 'react-router-dom';
import React from 'react';

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };


  // checks if there is a session token in the session storage
  const user = sessionStorage.getItem('token') ? true : false;

  return (
    <AppBar position="fixed" 
      sx={{
        backgroundColor: '#040736',
        display: 'flex',
        justifyContent: 'space-between',
        padding: 'o 1rem',
       ' @media (max-width:600px)': {
          Padding: '0 0.5rem',
        }
    }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
            <img
              src={Logo}
              width={80}
              alt="Podcast"
              loading="lazy"
            />
          </Box>
        {user ? (
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar sx={{ bgcolor: '#E7F1F9', width: { xs: 40, sm: 50 }, height: { xs: 40, sm: 50 } }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={() => navigate('/user-profile')}>My profile</MenuItem>
              <MenuItem onClick={() => navigate('/favourites')}>My favourites</MenuItem>
              <MenuItem onClick={() => navigate('/settings')}>Settings</MenuItem>
              <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
            </Menu>
          </div>
        ) : (
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar sx={{ bgcolor: '#E7F1F9', width: { xs: 40, sm: 50 }, height: { xs: 40, sm: 50 } }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={() => navigate('/signin')}>Sign In</MenuItem>
              <MenuItem onClick={() => navigate('/signin')}>Favourite management</MenuItem>
              <MenuItem onClick={() => navigate('/preferences')}>Preferences</MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}