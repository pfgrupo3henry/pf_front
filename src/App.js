import { Route, BrowserRouter, Routes } from "react-router-dom";
import {Nav} from "./Components/Nav/nav"
import {CardElement} from "./Components/Card/card"
import { CardList } from './Components/CardList/cardList';
import { PaginationHome } from './Components/Pagination/pagination';
import { UserInfo } from './Components/UserInfo/userInfo';

import CardDetail from './Components/CardDetail/CardDetail';
import Footer from './Components/Footer/Footer';




function App() {
  return (

    <div className="App">
      <BrowserRouter>
        <Nav/>
        <Routes>
          <Route  path="/" element={<CardList/>} />
        </Routes>
        
        <Routes>
          <Route exact path="/game" element={<CardDetail />} />
        </Routes>

        <Routes>
          <Route exact path="/profile/userInfo" element={<UserInfo />} />
        </Routes>
        
         <Footer />    
      </BrowserRouter>
    </div>
  );
}

export default App
