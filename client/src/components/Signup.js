import React, { useState,useContext } from "react";
import { toast } from "react-toastify";
import { GoogleLogin } from '@react-oauth/google';
import { Context } from '../context/Context';
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function SignUp() {
  const [name, setname] = useState("");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const {setlogin} = useContext(Context)

  const notifya = (e) => toast.success(e)
  const notifyb = (e) => toast.warn(e);
  const navigate = useNavigate();
  function postdata(e) {
    e.preventDefault();
    fetch(`https://techtribe-v65p.onrender.com/api/signup`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email,
        username: username,
        password: password
      })
    }).then((res) => {
      return res.json();
    }).then((data) => {
      if (data.success === false) {
        console.log(data.error);
        toast.error(data.message);
      }
      else {
        console.log(data);
        notifya(data.message)
        navigate("/signin");
      }
    }).catch((e) => {
      notifyb(e.message);
      console.log(e);
    })
  }
  const handleGoogleSignIn=(credentialResponse)=>{
    
    const jwtdetail = jwtDecode(credentialResponse);
    console.log(jwtdetail);
    fetch(`https://techtribe-v65p.onrender.com/api/googlesignin`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email_verified : jwtdetail.email_verified,
        name:jwtdetail.name,
        username:jwtdetail.email,
        email:jwtdetail.email,
        clientId:credentialResponse,
        photo:jwtdetail.picture
      })

    })
    .then(res=>res.json())
    .then(data=>{
      if(data.success === true){
      toast.success("Logged in successfully");
      localStorage.setItem("jwt",data.token); 
      localStorage.setItem("user",JSON.stringify(data.user)); 
     
      setlogin(true);
      navigate("/");
      }
    })
  }
  return (
    <>
      <section className="bg-white-50 dark:bg-white py-16">
        <div className="flex flex-col items-center justify-center px-6 py-10 mx-auto md:h-screen lg:py-0">
          <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-white-900 dark:text-black">
            <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
            TechTribe
          </Link>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign Up to your account
              </h1>
              <form className="space-y-4 md:space-y-6">
                <div>
                  <label htmlFor="fullname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your FullName</label>
                  <input type="text" name="fullname" value={name} id="fullname" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Sanjay" required=""
                    onChange={(e) => { setname(e.target.value) }}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input type="email" name="email" value={email} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""
                    onChange={(e) => { setemail(e.target.value) }}
                  />
                </div>
                <div>
                  <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Username</label>
                  <input type="text" name="username" value={username} id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required=""
                    onChange={(e) => { setusername(e.target.value) }}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input type="password" value={password} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                    onChange={(e) => { setpassword(e.target.value) }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                    </div>
                  </div>
                </div>
                <GoogleLogin
                  onSuccess={credentialResponse => {
                    handleGoogleSignIn(credentialResponse.credential);
                  }}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                />
                <button type="submit" className="w-full text-black bg-cyan-500 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800" onClick={postdata} >Sign Up</button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account yet?
                  <Link to="/signin" className="font-medium text-primary-600 hover:underline dark:text-primary-500" > Sign In </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
