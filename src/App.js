import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Nav } from "./Components/Nav/nav"
import { Home } from './Components/Home/Home';
import UserInfo from './Components/UserInfo/UserInfo2';
import CardDetail from './Components/CardDetail/CardDetail';
import Footer from './Components/Footer/Footer';
import { Favorites } from './Components/Favorites/Favorites';
import Admin from "./Components/Admin/Admin";
import LandingPage from "./Components/LandingPage/LandinPage";


//linea inutil para poder hacer nuevo commit


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route exact path="/game" element={<CardDetail />} />
          <Route exact path="/profile" element={<UserInfo />} />
          <Route exact path="/admin" element={<Admin />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App


