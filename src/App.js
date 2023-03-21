import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Nav } from "./Components/Nav/nav"
import { CardElement } from "./Components/Card/card"
import { CardList } from './Components/CardList/cardList';
import { PaginationHome } from './Components/Pagination/pagination';
import CardDetail from './Components/CardDetail/CardDetail';
import Footer from './Components/Footer/Footer';
import { Slider } from "./Components/Slider/Slider";
import CrearJuego from "./Components/Admin/Admin";




function App() {
  return (

    <div className="App">
      <BrowserRouter>

      <Nav />

      <Routes>

        <Route path="/" element={<CardList />} />

        <Route path="/admin" element={<CrearJuego />} />

        <Route exact path="/game/:id" element={<CardDetail />} />
        
        <Route path='slider-test' element={<Slider />} />

      </Routes>

      <Footer />

    </BrowserRouter>
    </div>
  )
}

export default App;
