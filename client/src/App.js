import React from "react";
import Navbar from "./components/Navbar";
import { Route,Routes } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import SignIn from "./components/SignIn";
import Profile from "./components/Profile";
function App() {
     
    return (
      <di
      v className="bg-gray-900 text-white min-h-screen">
          <Navbar/>
          <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/signin" element={<SignIn/>}></Route>
          <Route path="/profile" element={<Profile/>}></Route>
          </Routes>
        </di>
    );
}

export default App;
