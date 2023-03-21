import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Nav } from "./Components/Nav/nav"
import { CardElement } from "./Components/Card/card"
import { CardList } from './Components/CardList/cardList';
import { PaginationHome } from './Components/Pagination/pagination';
import CardDetail from './Components/CardDetail/CardDetail';
import Footer from './Components/Footer/Footer';
import CrearJuego from "./Components/CrearJuego/CrearJuego";




function App() {
  return (


    <BrowserRouter>

      <Nav />

      <Routes>

        <Route path="/" element={<CardList />} />

        <Route path="/admin" element={<CrearJuego />} />

        <Route exact path="/game/:id" element={<CardDetail />} />

      </Routes>

      <Footer />

    </BrowserRouter>

  );

};

export default App;
