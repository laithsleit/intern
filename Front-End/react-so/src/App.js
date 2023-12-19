import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './comp/Home';
import Login from './comp/login/Login';
import SignUp from './comp/login/SignUp';
import Profile from './comp/Profile';
import AboutUs from './comp/AboutUs';
import PlayerTable from './comp/Dashboard/PlayerTable';
import Dashbord from './comp/dashbord/Dashbord';
import DashbordRe from './comp/dashbord/DashbordRe';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/Profile" element={<Profile />} />
        <Route path="/a" element={<Home />} />
        <Route path='/DashbordUser' element={<Dashbord />} />
        <Route path='/DashbordRebot' element={<DashbordRe />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Sign" element={<SignUp />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/table" element={<PlayerTable />} />
      </Routes>
    </Router>
  );
}

export default App;
