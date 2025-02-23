import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <>
    <div>
        <dialog id="my_modal_3" className="modal">
        <div className="modal-box space-y-4 bg-gray-300 dark:bg-slate-800">
            <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <Link to=''><button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black dark:text-white" onClick={()=>document.getElementById('my_modal_3').close()}>✕</button></Link> 
            
            </form>
            <h3 className="font-bold text-3xl text-center text-black dark:text-white">Login</h3>
            <div>
            <label className="input input-bordered flex items-center gap-2 bg-white">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70 text-black">
                <path
                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path
                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input type="text" className="grow bg-white text-black " placeholder="Email" />
            </label>
            </div>
            <div>


            <label className="input input-bordered flex items-center gap-2 bg-white">
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
                <input type="password" className="flex-grow bg-white text-black" placeholder="Password" />
            </label>


            </div>
            <div>
            <button className="bg-black dark:bg-white dark:text-black text-white px-3 py-2 rounded-md hover:bg-slate-800 dark:hover:bg-gray-300 duration-300 cursor-pointer border-2 border-slate-600">Let's go</button>
            <div className='flex justify-around mt-4 text-black dark:text-white'>
                <p>Not registered? <Link to='/signup'><span className='underline text-blue-500 cursor-pointer'onClick={()=>
                document.getElementById("my_modal_3").close()}>Sign Up</span></Link></p>
            </div>
            </div>
        </div>
        </dialog>
    </div>
    </>
  )
}

export default Login
