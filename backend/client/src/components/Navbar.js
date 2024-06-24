import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from "./logo.jpg"
import { Context } from '../context/Context';

const Navbar = () => {
  const { login,setmodal } = useContext(Context);
  
  const Loginstatus = () => {
    if (login) {
      return (
        <>
         <Link to="/">
            <li className="mx-2 px-4 py-2 bg-white rounded-lg shadow hover:bg-gray-100 transition duration-200">Home</li>
          </Link>
          <Link to="/profile">
            <li className="mx-2 px-4 py-2 bg-white rounded-lg shadow hover:bg-gray-100 transition duration-200">Profile</li>
          </Link>
          <Link to="/createpost">
            <li className="mx-2 px-4 py-2 bg-white rounded-lg shadow hover:bg-gray-100 transition duration-200">Create Post</li>
          </Link>
          <Link to="" onClick={()=>setmodal(true)}>
            <li className="mx-2 px-4 py-2 bg-red-500 rounded-lg shadow hover:bg-gray-100 transition duration-200">Logout</li>
          </Link>
        </>
      );
    } else {
      return (
        <>
          <Link to="/signin">
            <li className="mx-2 px-4 py-2 bg-white rounded-lg shadow hover:bg-gray-100 transition duration-200">Sign In</li>
          </Link>
          <Link to="/signup">
            <li className="mx-2 px-4 py-2 bg-white rounded-lg shadow hover:bg-gray-100 transition duration-200">Sign Up</li>
          </Link>
        </>
      );
    }
  };
  const navigate = useNavigate();
  return (
    
    <div className="navbar bg-gray-200 shadow-md py-4 px-8 flex items-center justify-between">
      <img src={logo} alt="Logo" className="h-12 w-12 cursor-pointer" onClick={()=>navigate("/")} />
      <ul className="nav-menu text-gray-900 flex list-none">
        {Loginstatus()}
      </ul>
    </div>
  )
}

export default Navbar
