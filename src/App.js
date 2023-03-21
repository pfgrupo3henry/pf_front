import { Route, BrowserRouter, Routes } from "react-router-dom";
import {Nav} from "./Components/Nav/nav"
import {CardElement} from "./Components/Card/card"
import { CardList } from './Components/CardList/cardList';
import { PaginationHome } from './Components/Pagination/pagination';
import CardDetail from './Components/CardDetail/CardDetail';
import Footer from './Components/Footer/Footer';
import Filter from './Components/Filter/Filter'
import { Slider } from "./Components/Slider/Slider";




function App() {
  return (

    <div className="App">
      <BrowserRouter>
        <Nav/>
        <Routes>
          <Route  path="/" element={<CardList/>} />
        </Routes>

        <Routes>
          <Route  path="/" element={<CardList/>} />
        </Routes>
        
        <Routes>
          <Route exact path="/game" element={<CardDetail />} />
        </Routes>

        <Routes>
          <Route exact path="/slider-test" element={<Slider />} />
        </Routes>

        {/* <Routes>
          <Route path='/' element={<Filter />} />
        </Routes> */}

        <Routes>
          <Route exact path="/profile/userInfo" element={<CardDetail />} />
        </Routes>
        
         <Footer />    
      </BrowserRouter>
    </div>
  );
}

export default App

