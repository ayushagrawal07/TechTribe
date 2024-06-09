import React from "react";
import Navbar from "./components/Navbar";
import { Route,Routes } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import SignIn from "./components/SignIn";
import Profile from "./components/Profile";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
     
    return (
      <div className="bg-gray-900 text-white min-h-screen">
          <Navbar/>
          <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/signin" element={<SignIn/>}></Route>
          <Route path="/profile" element={<Profile/>}></Route>
          </Routes>
          <ToastContainer/>
        </div>
    );
}

export default App;
