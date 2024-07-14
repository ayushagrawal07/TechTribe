import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import SignIn from "./components/SignIn";
import Profile from "./components/Profile";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Createpost from "./components/CreatePost";
import { Context } from "./context/Context";
import LogoutModal from "./components/LogoutModal";
import Spinner from "./components/Spinner.js";
import Userprofile from "./components/Userprofile.js";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter } from "react-router-dom";


function App() {
  const [login,setlogin] = useState(false)
  const[modal,setmodal] = useState(false);
  const [loading,setloading]   = useState(false);
  
  return (
    <BrowserRouter>
    <div className="bg-black-900 text-white min-h-screen">
      <GoogleOAuthProvider clientId = "328049206311-e2u3dg96ng3eq1se5vt8di4525qg5l51.apps.googleusercontent.com" >
      <Context.Provider value={{login,setlogin,modal,setmodal,loading,setloading}}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/createpost" element={<Createpost />}></Route>
          <Route path = "/userprofile/:id" element = {<Userprofile></Userprofile>}/>
         
        </Routes>
        
        <ToastContainer />
        {modal &&<LogoutModal></LogoutModal>}
        {loading && <Spinner></Spinner>}
      </Context.Provider>
      </GoogleOAuthProvider>
    </div>
      </BrowserRouter>
   
  );
}

export default App;
