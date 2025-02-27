import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function AboutPage() {
  return (
    <>
      <div className="bg-white  md:bg-center bg-[right] bg-fixed  w-full h-full z-0 dark:bg-slate-900 dark:bg-cover md:dark:bg-[center_top] dark:bg-[right] dark:bg-fixed pt-10">
        <Navbar />

        <div className="max-w-screen-lg mx-auto p-4 my-10 mt-[70px]">
          <h1
            className="md:text-4xl text-2xl font-bold mb-4 text-center dark:text-white  text-black animate-pulse"
            style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)" }}
          >
            About Us
          </h1>
          <hr className="pt-[20px] pb-[20px] border-black dark:border-white" />

          <section className="md:space-y-6 space-y-2 dark:text-white text-black md:text-[14px]">
            <p className="text-gray-700 dark:text-white animate-slideIn text-[20px]">
              We are passionate about helping farmers, gardeners, and livestock
              owners ensure the health and well-being of their crops and
              animals. Our mission is to provide a fast, reliable, and
              user-friendly solution for early detection of plant and livestock
              diseases using cutting-edge artificial intelligence technology.
              <br />
              Our platform leverages the power of deep learning models, trained
              on a vast dataset of images, to identify diseases and
              abnormalities in plants and animals. Whether it's spotting common
              plant diseases or detecting symptoms in livestock, our system
              offers accurate results to help you take timely action and avoid
              potential damage to your farm or garden.
              <br />
              We believe that technology can revolutionize agriculture and
              animal care, making it more sustainable and efficient. Our team is
              dedicated to continuously improving the AI models and offering
              innovative solutions that make disease detection simpler and more
              accessible for everyone.
              <br />
              Join us on our mission to create healthier farms, healthier
              animals, and a healthier future.
            </p>
          </section>
        </div>

        <Footer />
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

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
}

export default AboutPage;
