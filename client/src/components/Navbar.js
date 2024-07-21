import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "./logo.jpg";
import { Context } from '../context/Context';

const Navbar = () => {
  const { login, setmodal } = useContext(Context);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearchClick = (userId) => {
    const loggedInUserId = JSON.parse(localStorage.getItem("user"))._id;
    if (userId === loggedInUserId) {
      navigate('/profile');
    } else {
      navigate(`/userprofile/${userId}`);
    }
    setQuery('');
    setSuggestions([]);
  };

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
          <Link to="" onClick={() => setmodal(true)}>
            <li className="mx-2 px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition duration-200">Logout</li>
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

  useEffect(() => {
    if (query.length > 1) {
      setLoading(true);
      fetch(`https://techtribe-v65p.onrender.com/api/search?query=${query}`, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
      })
        .then(response => response.json())
        .then(data => {
          setSuggestions(data);
          setLoading(false);
        })
        .catch(error => {
          console.log(error);
          setLoading(false);
        });
    } else {
      setSuggestions([]);
    }
  }, [query]);

  return (
    <div className="navbar bg-gray-900 bg-opacity-150 shadow-lg backdrop-blur-md py-4 px-8 flex items-center justify-between">
      <img src={logo} alt="Logo" className="h-12 w-12 cursor-pointer" onClick={() => navigate("/")} />
      {login && (
        <div className="relative flex-grow max-w-lg mx-4">
          <input
            type="text"
            placeholder="Search by username or email"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="text-gray-600 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
          />
          {loading && <div className="absolute top-0 right-0 mt-2 mr-4 spinner">Loading...</div>}
          {suggestions.length === 0 && query.length > 1 && !loading && (
            <div className="absolute w-full bg-white shadow-lg rounded-lg mt-1 max-h-60 overflow-auto z-10">
              <div className="text-gray-700 p-2 text-center">No users found</div>
            </div>
          )}
          {suggestions.length > 0 && (
            <div className="absolute w-full bg-white shadow-lg rounded-lg mt-1 max-h-60 overflow-auto z-10">
              {suggestions.map((user) => (
                <div
                  key={user._id}
                  className="text-gray-700 p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSearchClick(user._id)}
                >
                  {user.username} ({user.email})
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <ul className="nav-menu text-gray-900 flex list-none">
        {Loginstatus()}
      </ul>
    </div>
  );
}

export default Navbar;
