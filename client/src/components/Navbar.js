import React from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css";
import logo from "./logo.jpg"

const Navbar = () => {
  return (
    <div className='navbar'>
        <img src = {logo} alt=""/>
        <ul className='nav-menu'>
            <Link to ="./signin">
            <li>SignIn</li>
            </Link>
            <Link to ="./signup">
            <li>SignUp</li>
            </Link>
            <Link to ="./profile">
            <li>Profile</li>
            </Link>
            <Link to ="./createpost">
            <li>Create Post</li>
            </Link>
            
        </ul>
    {/* <Link to="/profile">
            <li>Profile</li>
          </Link>
          <Link to="/signin">
            <li>Signin</li>
          </Link>     */}

    
    </div>
  )
}

export default Navbar