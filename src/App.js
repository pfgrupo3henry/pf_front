import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Nav } from "./Components/Nav/nav"
import Footer from './Components/Footer/Footer';
import CardDetail from './Components/CardDetail/CardDetail';


function App() {
  return (

    <BrowserRouter>

      <Nav />

      <Routes>

        <Route exact path="/game/:id" element={<CardDetail />} />

      </Routes>

      <Footer />

    </BrowserRouter>

  );

};

export default App;
