import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toolbar } from '@mui/material';
import { Header } from './components/header/Header';
import ShowDetails from './pages/ShowDetailsPage';
import { SignIn } from './pages/SignIn';
import ShowList from './components/show/ShowList';
import { SignUp } from './pages/SignUp';

function App() {
  return (
    <Router>
      <div style={{width:"80%", margin: '0 auto'}} >
        <Header /> 
        <Toolbar />
        <Toolbar />
        <Toolbar />
        <Routes>
          <Route path="/show/:showId" element={<ShowDetails />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/" element={<ShowList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
