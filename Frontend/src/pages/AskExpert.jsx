import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function AskExpert() {
  return (
    <>
      <div className="bg-white dark:bg-slate-900 pt-1">
        <Navbar />
        <div className="max-w-screen-lg mx-auto m-[100px] p-4">
          <h1
            className="md:text-3xl text-2xl font-bold mb-4 text-center text-black dark:text-white"
            style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)" }}
          >
            Ask An Expert
          </h1>
          <div>
            <h1 className="text-2xl text-black dark:text-white">Contact No.</h1>
            <ul className="bg-gray-300 dark:bg-white rounded-lg p-4 text-black dark:text-black">
              <p c>+91 0000000000</p>
              <p>+91 0000000000</p>
              <p>+91 0000000000</p>
              <p>+91 0000000000</p>
            </ul>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default AskExpert;
