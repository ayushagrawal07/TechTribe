import React, { useState,useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import  {toast}  from 'react-toastify';
import { Context } from '../context/Context';


const SignIn = () => {
  const {setlogin,setotpmodal} = useContext(Context)
  const [email,setemail] = useState("");
  const [password,setpassword] = useState("");
  const navigate = useNavigate();
  function postdata(event){
    event.preventDefault(); 
   fetch(`https://techtribe-v65p.onrender.com/api/signin`,{
    method:"post",
    headers:{
    "Content-Type":"application/json"
    },
    body:JSON.stringify({
      email:email,password:password
    })


   }).then((res)=>{

    return res.json();
    
   })
   .then((data)=>{
 
   
    if(data.success === false){
      toast.error(data.message);
    }
    else {
    toast.success("Logged in successfully");
      localStorage.setItem("jwt",data.token); 
      localStorage.setItem("user",JSON.stringify(data.saveduser)); 
     
      setlogin(true);
      navigate("/");
    }
   })
  }
  return (
    <>
      <section className="bg-gray-50 dark:bg-white">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-black">
            <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
            TechTribe
          </Link>

          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input type="email" value={email}name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""
                  onChange={(e)=>{setemail(e.target.value)}}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input type="password" value={password} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                  onChange={(e)=>{setpassword(e.target.value)}}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                    </div>
                  </div>
                  <Link className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500" onClick={()=>setotpmodal(true)}>Forgot password?</Link>

                </div>
                
                <button 
  type="submit" 
  onClick={postdata}
  className="w-full text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
  Sign in
</button>

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet ? <Link to="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SignIn;
