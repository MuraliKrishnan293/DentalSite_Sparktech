// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import AboutUs from "./Components/About";
// import Register from "./Components/Register";
// import Login from './Components/LoginFiles/Login';
// import Home from "./Components/Home";
// import Book from './Components/Book';
// import Land from "./Components/Land";
// import Nav from "./Components/Nav";
// import { useEffect, useState } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import Payment from "./Components/Pay";
// import AdminPanel from "./Components/AdminFiles/AdminPanel";
// import ConfirmOtp from "./Components/ConfirmOtp";
// import Specialities from "./Components/Specialities";
// import ScrollToTop from "react-scroll-to-top";
// import svg from './images/tooth-line-drawing-svgrepo-com.svg';
// import './App.css';

// function App() {

//   useEffect(() => {
//     AOS.init({ duration: 1000});
//   }, []);

//   const [load, setLoad] = useState(false);

//   useEffect(() => {
//     setLoad(true);
//     setTimeout(() => {
//       setLoad(false);
//     }, 3000);
//   }, []);

//   return (
//     <div className="App">
//       {load ? (
//         <div className="loading-screen">
//           <div className="spinner"></div>
//         </div>
//       ) : (
//         <BrowserRouter>
//         <Nav />
//           <Routes>
//             <Route path='/' element={<Land />} />
//             <Route path='/specialities' element={<Specialities />} />
//             <Route path='/register' element={<Register />} />
//             <Route path='/confirm-otp' element={<ConfirmOtp />} />
//             <Route path='/login' element={<Login />} />
//             <Route path='/home' element={<Home />} />
//             <Route path='/about' element={<AboutUs />} />
//             <Route path='/book' element={<Book />} />
//             <Route path="/payment" element={<Payment />} />
//             <Route path="/admin" element={<AdminPanel />} />
//           </Routes>
//           <ScrollToTop smooth icon />
//         </BrowserRouter>
//       )}
//       {/* <BrowserRouter>
//         <Routes>
//           <Route path='/' element={<Land />} />
//           <Route path='/login' element={<Login />} />
//           <Route path='/home' element={<Home />} />
//           <Route path='/book' element={<Book />} />
//         </Routes>
//       </BrowserRouter> */}
//     </div>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutUs from "./Components/About";
import Register from "./Components/Register";
import Login from './Components/LoginFiles/Login';
import Home from "./Components/Home";
import Book from './Components/Book';
import Land from "./Components/Land";
import Nav from "./Components/Nav";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Payment from "./Components/Pay";
import AdminPanel from "./Components/AdminFiles/AdminPanel";
import ConfirmOtp from "./Components/ConfirmOtp";
import Specialities from "./Components/Specialities";
import ScrollToTop from "react-scroll-to-top";
import '@fortawesome/fontawesome-free/css/all.min.css'; // Font Awesome import
import './App.css';

function App() {

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
    setTimeout(() => {
      setLoad(false);
    }, 3000);
  }, []);

  return (
    <div className="App">
      {load ? (
        <div className="loading-screen">
          <div className="spinner"></div>
        </div>
      ) : (
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path='/' element={<Land />} />
            <Route path='/specialities' element={<Specialities />} />
            <Route path='/register' element={<Register />} />
            <Route path='/confirm-otp' element={<ConfirmOtp />} />
            <Route path='/login' element={<Login />} />
            <Route path='/home' element={<Home />} />
            <Route path='/about' element={<AboutUs />} />
            <Route path='/book' element={<Book />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>

          {/* Adding Scroll to Top with Font Awesome icon */}
          <ScrollToTop
            smooth
            component={<i className="fas fa-tooth"></i>} // Font Awesome 'tooth' icon
            style={{
              backgroundColor: "#2A4735",
              borderRadius: "50%",
              padding: "5px",
              right: "20px",
              bottom: "20px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
              color: "white", // Icon color
              fontSize: "24px" // Icon size
            }}
          />
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;