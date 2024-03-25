import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toolbar } from '@mui/material';
import { Header } from './components/header/Header';
// import ShowList from './components/show/ShowList';
import ShowDetails from './pages/ShowDetailsPage';
import { SignUp } from './components/pages/SignUp';
import { SignIn } from './components/pages/SignIn';

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
          {/* <Route path="/" element={<SignIn />} /> */}
          <Route path="/" element={<SignIn />} />
          {/* <Route path="/" element={<ShowList />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
