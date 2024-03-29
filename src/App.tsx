import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShowDetails from './pages/ShowDetailsPage';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { ForgotPassword } from './pages/ForgotPassword';
import { SettingsPage } from './pages/SettingsPage';
import Header from './components/header/Header';
import HomePage from './pages/HomePage';
import { ReactNotifications } from 'react-notifications-component';
import FavouratesPage from './pages/FavouratesPage';
import RequireAuth from './auth';
import ListeningHistoryPage from './pages/ListeningHistoryPage';

function App() {
  return (
    <Router>
      <div style={{ background: "#E7F1F9" }} >
        <ReactNotifications />
        <Header />
        
        <Routes>
          {/* public routes */}
          <Route path="/register" element={<SignUp />} />
          <Route index path="/" element={<SignIn />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* Private routes */}
          <Route element={<RequireAuth />}>
            <Route path="/show/:showId" element={<ShowDetails />} />        
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/favourates" element={<FavouratesPage />} />
            <Route path="/history" element={<ListeningHistoryPage />} />
            <Route path="/home" element={<HomePage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
