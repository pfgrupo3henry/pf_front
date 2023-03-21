import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Nav } from "./Components/Nav/nav";
import { CardElement } from "./Components/Card/card"
import { CardList } from './Components/CardList/cardList';
import { PaginationHome } from './Components/Pagination/pagination';
import CardDetail from './Components/CardDetail/CardDetail';
import Footer from './Components/Footer/Footer';
// import Filter from './Components/Filter/Filter'

function App() {
  return (

    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Nav />} />
        </Routes>
        {/* <Routes>
            <Route path='/' element={<Filter />} />
          </Routes> */}
        <Routes>
          <Route path="/" element={<CardList />} />
        </Routes>
        <Routes>
          <Route exact path="/game/:id" element={<CardDetail />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
export default App;
