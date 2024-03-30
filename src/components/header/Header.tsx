import { AppBar, Toolbar, IconButton, Avatar, Menu, MenuItem, Box } from '@mui/material';
import Logo from '../../assets/android-chrome-144x144.png';
import { supabase } from "../../auth/supabase.service";
import { useLocation, useNavigate } from 'react-router-dom';
import React from 'react';
import { useShowsContext } from '../../context/ShowsContext';

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const { token } = useShowsContext()
  const fullName = token?.user.user_metadata.first_name + " " + token?.user.user_metadata.last_name;

  const navigate = useNavigate();
  
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    sessionStorage.removeItem('token');
    navigate('/');
  };


  const location = useLocation();
  const hideOnSignInPages = ['/', '/register', '/forgot-password'];
  if (hideOnSignInPages.includes(location.pathname)) {
    return null;
  }

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
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar sx={{ backgroundColor: '#E7F1F9', width: { xs: 40, sm: 50 }, height: { xs: 40, sm: 50 } }} src='/2.jpg' alt={ fullName }/>
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
              <MenuItem onClick={() => { navigate('/home'); handleClose(); }}>Home</MenuItem>
              <MenuItem onClick={() => { navigate('/favourates'); handleClose(); }}>My favourites</MenuItem>
              <MenuItem onClick={() => { navigate('/settings'); handleClose(); }}>Settings</MenuItem>
              <MenuItem onClick={() => { handleSignOut(); handleClose(); }}>Sign Out</MenuItem>
            </Menu>
          </div>
      </Toolbar>
    </AppBar>
  );
}