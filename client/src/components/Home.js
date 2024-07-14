import React, { useContext, useEffect, useState } from 'react'
import Card from './Card'
import { Context } from "../context/Context.js"
import { useNavigate } from 'react-router-dom';
import dotenv from 'dotenv';
dotenv.config();
const Base_Url = process.env.Base_Url;
const Home = () => {

  const { login } = useContext(Context);
  const [data, setData] = useState([])
  
  const navigate = useNavigate();

  useEffect(() => {
    if (!login) navigate("./signup");
    fetch(`${Base_Url}/api/posts`, {
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