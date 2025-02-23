import React from 'react'
import { Link } from 'react-router-dom'
import Login from './Login'
const SignUp = () => {
  return (
    <>
    <div className="h-screen bg-[url('/img1.png')] bg-cover md:bg-center bg-[right] bg-fixed top-0 left-0 w-full z-0 dark:bg-[url('/img2.png')] dark:bg-cover md:dark:bg-[center_top] dark:bg-[right] dark:bg-fixed">
    <div className='flex items-center justify-center h-screen'>
    <div className="card bg-base-100 w-[400px] md:w-5/12 shadow-2xl">
    <div className="card-body bg-white dark:bg-slate-800">
    <Link to='/'><button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black dark:text-white">✕</button></Link>
        <h2 className="text-2xl font-bold text-center mb-6 text-black dark:text-white">Create An Account</h2>
        <div className='md:flex text-center space-x-2 items-center justify-center mb-3 ml-9 space-y-4 md:ml-0 md:space-y-0'>
            <label className="input input-bordered flex items-center gap-2 md:w-5/12 w-10/12 ml-2 md:ml-0 bg-white">
        
        <input type="text" className="grow bg-white  text-black" placeholder="FirstName" />
        </label>
        <label className="input input-bordered flex items-center gap-2 md:w-5/12 w-10/12 bg-white">
        
        <input type="text" className="grow bg-white text-black" placeholder="LastName" />
        </label>
        </div>
        <div className='flex flex-col items-center justify-center space-y-5'>
        <label className="input input-bordered flex items-center gap-2 md:w-10/12 w-9/12 bg-white">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70 text-black ">
            <path
            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path
            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
        </svg>
        <input type="text" className="grow bg-white text-black" placeholder="Email" />
        </label>
        <label className="input input-bordered flex items-center gap-2  md:w-10/12 w-9/12 bg-white">
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="h-4 w-4 opacity-70 text-black">
        <path
        fillRule="evenodd"
        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
        clipRule="evenodd" />
    </svg>
    <input type="password" className="flex-grow bg-white text-black " placeholder="Password" />
</label>

        </div>

        <div className="flex items-center space-x-2 md:pl-28 mt-5 pl-2">
            <input
            type="checkbox"
            id="terms"
            name="terms"
            className="h-4 w-4 bg-white text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            required
            />
            <label
            htmlFor="terms"
            className="text-sm text-black dark:text-white">
            I accept the <a href="/terms" className="text-blue-600 hover:underline">Terms of Use</a> & <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
            </label>
        </div>
        
        <div className="card-actions justify-center mt-5">
        <button className="bg-black dark:bg-white text-white dark:text-black px-3 py-2 rounded-md dark:hover:bg-gray-300 hover:bg-slate-800 duration-300 cursor-pointer border-2 border-slate-600">Sign Up</button>
        </div>
        <div className='text-center text-black dark:text-white'>
            <Link to={""}><p>Already have an account? <span className='text-blue-600 hover:underline cursor-pointer' onClick={()=>
                document.getElementById("my_modal_3").showModal()
            }>Login</span>
            <Login/></p></Link>
        </div>
    </div>
    </div>
    </div>
    </div>
     
    </>
  )
}

export default SignUp
