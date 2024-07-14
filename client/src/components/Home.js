import React, { useContext, useEffect, useState } from 'react'
import Card from './Card'
import { Context } from "../context/Context.js"
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const { login } = useContext(Context);
  const [data, setData] = useState([])
  
  const navigate = useNavigate();

  useEffect(() => {
    if (!login) navigate("./signup");
    fetch(`https://techtribe-v65p.onrender.com/api/posts`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    })
      .then(res => res.json())
      .then(result => setData(result))
      .catch(error => console.log(error));
  }, [login,navigate])

  return (
    <>
      <div>
        {
          data.map((post) => {
            return (
              <Card post={post} />
            )
          })
        }
      </div>
    </>
  )
}

export default Home