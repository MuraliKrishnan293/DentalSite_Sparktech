import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutUs from "./Components/About";
import Register from "./Components/Register";
import Login from './Components/Login';
import Home from "./Components/Home";
import Book from './Components/Book';
import Land from "./Components/Land";
import Nav from "./Components/Nav";
import { useEffect, useState } from "react";

function App() {

  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
    setTimeout(() => {
      setLoad(false);
    }, 5000);
  }, []);

  return (
    <div className="App">
      {load ? (
        <div className="loading-screen">
          <div className="spinner"></div>
        </div>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Land />} />
            <Route path='/login' element={<Login />} />
            <Route path='/home' element={<Home />} />
            <Route path='/book' element={<Book />} />
          </Routes>
        </BrowserRouter>
      )}
      {/* <BrowserRouter>
        <Routes>
          <Route path='/' element={<Land />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/book' element={<Book />} />
        </Routes>
      </BrowserRouter> */}
    </div>
  );
}

export default App;