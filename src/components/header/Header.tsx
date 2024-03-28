import { AppBar, Toolbar, IconButton, Avatar, Menu, MenuItem, Box, Button } from '@mui/material';
import Logo from '../../assets/android-chrome-144x144.png';
import { supabase } from "../../auth/supabase.service";
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
    sessionStorage.removeItem('token');
    navigate('/signin');
  };

  // checks if there is a session token in the session storage
  const user = sessionStorage.getItem('token') ? true : false;

  const location = useLocation();
  const hideOnSignInPages = ['/signin', '/signup', '/forgot-password'];
  if (hideOnSignInPages.includes(location.pathname)) {
    return null;
  }

  // const userName = supabase.auth.user();
  // if (user) {
  //   console.log(user.user.metadata.full_name);
  // } else {
  //   console.log('no user is currently logged in');
  // }

  // const userInitial = userName ? userName[0].toUpperCase() : '';

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
          <Link to={'/'}>
              <img
              src={Logo}
              width={80}
              alt="Podcast"
              loading="lazy"
              />
          </Link>
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
              <Avatar sx={{ bgcolor: '#E7F1F9', width: { xs: 40, sm: 50 }, height: { xs: 40, sm: 50 } }} src='/2.jpg' alt='Malebo'/>
            </IconButton>
            <Menu
              sx={{ mt: '45px' }}
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
              <MenuItem onClick={() => navigate('/favourates')}>My favourites</MenuItem>
              <MenuItem onClick={() => navigate('/settings')}>Settings</MenuItem>
              <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
            </Menu>
          </div>
        ) : null }
      </Toolbar>
    </AppBar>
  );
}