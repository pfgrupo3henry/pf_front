import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter, Routes } from "react-router-dom";
import {Nav} from "./Components/Nav/nav"
import {CardElement} from "./Components/Card/card"
import { CardList } from './Components/CardList/cardList';
import { PaginationHome } from './Components/Pagination/pagination';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route  path="/" element={<Nav/>} />
        </Routes>

        <Routes>
        <Route  path="/" element={<CardList/>} />
        </Routes>

{/*         <Routes>
        <Route  path="/" element={<PaginationHome/>} />
        </Routes>
 */}
        
      </BrowserRouter>
    </div>
  );
}

export default App;
