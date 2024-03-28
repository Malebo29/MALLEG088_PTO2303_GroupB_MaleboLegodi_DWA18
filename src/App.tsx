import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box, useTheme } from '@mui/material';
import ShowDetails from './pages/ShowDetailsPage';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { ForgotPassword } from './pages/ForgotPassword';
import { UserProfile } from './pages/UserProfile';
import { SettingsPage } from './pages/SettingsPage';
import Header from './components/header/Header';
import HomePage from './pages/HomePage';
import { ReactNotifications } from 'react-notifications-component';
import FavouratesPage from './pages/FavouratesPage';
import RequireAuth from './auth';

function App() {
  const theme = useTheme()
  return (
    <Router>
      <div style={{ background: "#E7F1F9", width:"100%", margin: '0 auto'}} >
        <ReactNotifications />
        <Header />
        <Box sx={{height: theme.spacing(10)}} /> 
        <Routes>
          {/* public routes */}
          <Route path="/register" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* Private routes */}
          <Route element={<RequireAuth />}>
            <Route path="/show/:showId" element={<ShowDetails />} />        
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/favourates" element={<FavouratesPage />} />
            <Route path="/" element={<HomePage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
