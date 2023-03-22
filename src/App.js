import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Nav } from "./Components/Nav/nav"
import { CardElement } from "./Components/Card/card"
import { Home } from './Components/Home/Home';
import { PaginationHome } from './Components/Pagination/pagination';
import { UserInfo } from './Components/UserInfo/UserInfo';
import CardDetail from './Components/CardDetail/CardDetail';
import Footer from './Components/Footer/Footer';
import Filter from './Components/FilterHome/filterHome'
import { Slider } from "./Components/Slider/Slider";
import Admin from "./Components/Admin/Admin";




function App() {
  return (

    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>

        <Routes>
          <Route exact path="/game" element={<CardDetail />} />
        </Routes>

        <Routes>
          <Route exact path="/profile" element={<UserInfo />} />
        </Routes>

        <Routes>
          <Route exact path="/admin" element={<Admin />} />
        </Routes>


        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App


/*


*/