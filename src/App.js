import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Nav } from "./Components/Nav/nav"
import Footer from './Components/Footer/Footer';


function App() {
  return (

    <div className="App">

      <BrowserRouter>

        <Routes>

          <Route exact path="/" element={<Nav />} />

        </Routes>

        <Footer />

      </BrowserRouter>

    </div>

  );

};

export default App;
