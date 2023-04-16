import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Nav } from "./Components/Nav/nav"
import { Home } from './Components/Home/Home';
import UserInfo from './Components/UserInfo/UserInfo2';
import CardDetail from './Components/CardDetail/CardDetail';
import Footer from './Components/Footer/Footer';
import { Favorites } from './Components/Favorites/Favorites';
import Admin from "./Components/Admin/Admin";
import LandingPage from "./Components/LandingPage/LandinPage";
import { FinishPayment } from "./Components/FinishPayment/FinishPayment";
import { useDispatch } from "react-redux";
import { getCards } from "./Redux/Actions/Index";
import SingUp from "./Components/Login/Sing-up";
import { LoginForm } from "./Components/Login/Login";
import Contact from './Components/Contact/Contact'
import RatingWeb from "./Components/RatingWeb/RatingWeb";
import Equipo from './Components/Equipo/Equipo';
import Nosotros from './Components/Nosotros/Nosotros'
import Chatty from "./Components/Chatbot/Chatty";


function App() {

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getCards());
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/game/:id" element={<CardDetail />} />
          <Route path="/profile" element={<UserInfo />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/status-payment" element={<FinishPayment />} />
          {/*           <Route path="/login" element={<LoginForm />} />
 */}          <Route path="/login" element={<SingUp />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/ratingWeb' element={<RatingWeb />} />
          <Route path='/equipo' element={<Equipo />} />
          <Route path='/nosotros' element={<Nosotros />} />
          <Route path='/chatty' element={<Chatty />} />


        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}


export default App;
