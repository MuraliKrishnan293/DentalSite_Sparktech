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

import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import AboutUs from "./Components/About";
import Register from "./Components/Register";
import Login from './Components/LoginFiles/Login';
import Home from "./Components/Home";
import Book from './Components/Book';
import Land from "./Components/Land";
import Nav from "./Components/Nav";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useEffect, useState, lazy, Suspense } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Payment from "./Components/Pay";
import AdminPanel from "./Components/AdminFiles/AdminPanel";
import ConfirmOtp from "./Components/ConfirmOtp";
import Specialities from "./Components/Specialities";

import ScrollToTop from "react-scroll-to-top";
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';

import RatingComponent from "./Components/RatingComponent";
import Confirmation from "./Components/Confirm";
import PrintDemo from "./Components/Print";
import ForgotPassword from "./Components/LoginFiles/ForgotPassword";



// const AboutUs = lazy(() => import("./Components/About")); const Register = lazy(() => import("./Components/Register")); const Login = lazy(() => import('./Components/LoginFiles/Login')); const Home = lazy(() => import("./Components/Home")); const Book = lazy(() => import('./Components/Book')); const Land = lazy(() => import("./Components/Land")); const Payment = lazy(() => import("./Components/Pay")); const AdminPanel = lazy(() => import("./Components/AdminFiles/AdminPanel")); const ConfirmOtp = lazy(() => import("./Components/ConfirmOtp")); const Specialities = lazy(() => import("./Components/Specialities")); const Confirmation = lazy(() => import("./Components/Confirm")); const PrintDemo = lazy(() => import("./Components/Print")); const ForgotPassword = lazy(() => import("./Components/LoginFiles/ForgotPassword"));

function App() {

  const nav = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const [load, setLoad] = useState(true);

  useEffect(() => {
    setLoad(true);
    setTimeout(() => {
      setLoad(false);
    }, 3000);
  }, []);

  const toastOptions = {
    position: "top-left",
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };


  // useEffect(() => {
  //   const tokenExpiry = localStorage.getItem("tokenExpiry");
  //   if (tokenExpiry) {
  //     const remainingTime = parseInt(tokenExpiry, 10) - Date.now();

  //     if (remainingTime > 0) {
  //       setTimeout(() => {
  //         localStorage.clear();
  //         toast.error("Session expired. Please log in again.", toastOptions);
  //         nav('/login');
  //       }, remainingTime);
  //     } else {
  //       localStorage.clear();
  //       // nav('/admin');
  //     }
  //   }
  // }, [nav]);

  return (
    <div className="App">
      {load ? (
        <div className="loading-screen">
          <div className="spinner"></div>
        </div>
      ) : (
        <BrowserRouter>
          <Nav />
          {/* <Suspense fallback={<div className="loading-screen"><div className="spinner"></div></div>}> */}
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
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path='/print' element={<PrintDemo />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
          </Routes>
          {/* </Suspense> */}

          <ScrollToTop
            smooth
            component={<i className="fas fa-tooth"></i>}
            style={{
              backgroundColor: "#2A4735",
              borderRadius: "50%",
              padding: "2px",
              right: "20px",
              bottom: "20px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
              color: "white",
              fontSize: "24px",
            }}
          />
          {/* <RatingComponent /> */}
        </BrowserRouter>
      )}
      <ToastContainer />
    </div>
  );
}

export default App;