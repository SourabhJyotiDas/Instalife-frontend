import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../Actions/User';
import { useDispatch, useSelector } from "react-redux"
import { toast } from 'react-toastify';
import Loader from './Loader';
import { FcGoogle } from "react-icons/fc";

export default function Login() {

   const dispatch = useDispatch()
   const navigate = useNavigate()

   const { loading, error } = useSelector((state) => state.user);


   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")

   const loginHandle = (e) => {
      e.preventDefault()
      setEmail("")
      setPassword("")
      dispatch(loginUser(email, password))
      navigate("/")
   }

   useEffect(() => {
      if (error) {
         toast.error(error, {
            position: "top-center",
            autoClose: 2000,
            theme: "colored",
         });
         dispatch({ type: "clearErrors" });
      }

   }, [dispatch, error,])

   let myServer = "http://localhost:5000/api/v1";

   const handleGoogleLogin = () => {
      window.open(`${myServer}/googlelogin`, "_self");
   };

   return (
      <>
         {
            loading ? <Loader message="Connecting" /> :
               <div className=' h-[100vh] flex items-center bg-gray-300 justify-center md:mx-auto md:w-[50vw]'>
                  <div className='h-[auto] w-[100%] m-auto  py-5 rounded-md'>

                     <form onSubmit={loginHandle} className='flex flex-col justify-center items-center mt-10'>
                        <input value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder='Email' className='w-[90%] py-2 border border-gray outline-none my-2 px-2' />
                        <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder='Password' className='w-[90%] py-2 border border-gray outline-none my-2 px-2' />
                        <button type='submit' className=' flex justify-center items-center bg-purple-500 w-[90%] py-3   font-semibold'>Log in</button>
                        <button className=' flex justify-center items-center bg-white w-[90%] py-3 my-5  font-semibold' onClick={handleGoogleLogin}>
                           <FcGoogle className='text-2xl mr-3'/>Signin with Google
                        </button>
                        <div className='underline'> <Link to="/register">New user ? Register</Link></div>
                     </form>

                  </div>
               </div>
         }
      </>
   )
}
