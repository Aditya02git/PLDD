import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";
import { auth } from "./Firebaseconfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Signup = () => {
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      alert("Signup Successful!");
      navigate("/home");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="h-screen bg-[url('/img1.png')] bg-cover md:bg-center bg-[right] bg-fixed top-0 left-0 w-full z-0 dark:bg-[url('/img2.png')] dark:bg-cover md:dark:bg-[center_top] dark:bg-[right] dark:bg-fixed">
      <div className="flex items-center justify-center h-screen">
        <div className="card bg-base-100 w-[400px] md:w-5/12 shadow-2xl">
          <div className="card-body bg-white dark:bg-slate-800">
            <Link to="/">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black dark:text-white">✕</button>
            </Link>
            <h2 className="text-2xl font-bold text-center mb-6 text-black dark:text-white">Create An Account</h2>

            <form onSubmit={handleSignup}>
              <div className="md:flex text-center space-x-2 items-center justify-center mb-3 ml-9 space-y-4 md:ml-0 md:space-y-0">
                <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="input input-bordered md:w-5/12 w-10/12 bg-white text-black" required />
                <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="input input-bordered md:w-5/12 w-10/12 bg-white text-black" required />
              </div>

              <div className="flex flex-col items-center justify-center space-y-5">
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="input input-bordered md:w-10/12 w-9/12 bg-white text-black" required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="input input-bordered md:w-10/12 w-9/12 bg-white text-black" required />
              </div>

              <div className="flex items-center space-x-2 md:pl-28 mt-5 pl-2">
                <input type="checkbox" id="terms" name="terms" className="h-4 w-4 bg-white text-blue-600 border-gray-300 rounded focus:ring-blue-500" required />
                <label htmlFor="terms" className="text-sm text-black dark:text-white">
                  I accept the <a href="/terms" className="text-blue-600 hover:underline">Terms of Use</a> & <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
                </label>
              </div>

              <div className="card-actions justify-center mt-5">
                <button type="submit" className="bg-black dark:bg-white text-white dark:text-black px-3 py-2 rounded-md dark:hover:bg-gray-300 hover:bg-slate-800 duration-300 cursor-pointer border-2 border-slate-600">Sign Up</button>
              </div>
            </form>

            <div className="text-center text-black dark:text-white mt-4">
              Already have an account?{" "}
              <span className="text-blue-600 hover:underline cursor-pointer" onClick={() => document.getElementById("my_modal_3").showModal()}>
                Login
              </span>
              <Login />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
