import React from "react";
import Freebook from "./Freebook";
function Banner() {
  const handleScroll = () => {
    let scrollPosition = 1280; // Default

    if (window.innerWidth <= 768) {
      // For tablets and smaller screens
      scrollPosition = 1200;
    }
    if (window.innerWidth <= 480) {
      // For mobile screens
      scrollPosition = 1300;
    }

    window.scrollTo({
      top: scrollPosition,
      behavior: "smooth",
    });
  };
  return (
    <>
      <div className="bg-white dark:bg-slate-900 max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10 pb-5">
        <div className="w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-36">
          <div className="md:space-y-8 space-y-4">
            <h1 className="text-[20px] md:text-4xl text-black dark:text-white font-bold animate-fadeIn">
              Hello, welcome to our{" "}
              <span className="text-pink-500">5MinCare.Ai....!!!</span>
            </h1>
            <p className="text-[12px] md:text-xl animate-slideIn text-black dark:text-white">
              Your trusted partner in ensuring the health of your plants and
              livestock.
              <br />
              We harness the power of artificial intelligence to provide fast
              and accurate disease detection for crops and animals. Whether
              you're a farmer, gardener, or animal caregiver, our platform is
              designed to help you identify potential issues early, allowing you
              to take action and protect your crops and livestock effectively.
            </p>
          </div>
          <button
            className="bg-orange-800 hover:bg-orange-900 m-4 p-4 rounded-md font-bold text-2xl text-center text-white dark:text-white"
            onClick={handleScroll}
          >
            Get Started
          </button>
        </div>
        <div className=" order-1 w-full mt-20 md:w-1/2">
          <Freebook />
        </div>
      </div>
      {/* Keyframe Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideIn {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-in-out;
        }

        .animate-slideIn {
          animation: slideIn 1s ease-in-out;
        }

        .animate-pulse {
          animation: pulse 2s infinite;
        }
      `}</style>
    </>
  );
}

export default Banner;
