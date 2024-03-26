import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box, useTheme } from '@mui/material';
import { Header } from './components/header/Header';
import ShowDetails from './pages/ShowDetailsPage';
import { SignIn } from './pages/SignIn';
import ShowList from './components/show/ShowList';
import { SignUp } from './pages/SignUp';
import { ForgotPassword } from './pages/ForgotPassword';
import { UserProfile } from './pages/UserProfile';
import { SettingsPage } from './pages/SettingsPage';

function App() {
  const theme = useTheme()
  return (
    <Router>
      <div style={{width:"80%", margin: '0 auto'}} >
        <Header />
        <Box sx={{height: theme.spacing(2)}} /> 
        <Routes>
          <Route path="/show/:showId" element={<ShowDetails />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/" element={<ShowList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
