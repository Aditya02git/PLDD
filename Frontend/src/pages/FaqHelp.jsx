import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function FaqHelp() {
  return (
    <>
      <div className="bg-white  md:bg-center bg-[right] bg-fixed  w-full h-full z-0 dark:bg-slate-900 dark:bg-cover md:dark:bg-[center_top] dark:bg-[right] dark:bg-fixed pt-10">
        <Navbar />

        <div className="max-w-screen-lg mx-auto p-4 my-10 mt-[70px]">
          <h1
            className="md:text-4xl text-2xl font-bold mb-4 text-center dark:text-white text-black "
            style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)" }}
          >
            FAQ/Help
          </h1>
          <hr className="pt-[20px] pb-[20px] border-black dark:border-white" />

          <section className="md:space-y-6 space-y-2 dark:text-white text-black md:text-[14px]">
            <p className="text-gray-700 dark:text-white animate-slideIn text-[20px]">
              <span className="font-semibold">
                1. How does the disease detection work?
              </span>
              <br />
              ⇒Our AI-powered system analyzes the uploaded image of your plant
              or livestock. Using deep learning models trained on large
              datasets, it detects common diseases or abnormalities and provides
              a detailed report with possible diagnoses and recommendations for
              treatment or prevention.
              <br />
              <span className="font-semibold">
                2. What types of diseases can the platform detect?
              </span>
              <br />
              ⇒Our platform can detect a wide range of diseases for both plants
              and livestock, including fungal infections, bacterial diseases,
              pest infestations, and more. We are constantly updating our models
              to detect emerging diseases and ensure accuracy.
              <br />
              <span className="font-semibold">
                3. How do I upload an image for detection?
              </span>
              <br />
              ⇒Simply navigate to the “Upload Image” section on the homepage,
              select whether you are uploading an image of a plant or livestock,
              and either drag and drop your file or click to browse and select
              the image from your device.
              <br />
              <span className="font-semibold">
                4. Is there a limit to the number of images I can upload?
              </span>
              ⇒Currently, there is no limit on the number of images you can
              upload. However, we recommend uploading clear and high-quality
              images for better accuracy.
              <br />
              <span className="font-semibold">
                5. Is the detection process instant?
              </span>
              <br />
              ⇒Yes, the detection process is fast! After uploading your image,
              the results are typically ready in just a few moments.
              <br />
              <span className="font-semibold">
                6. Can I use the platform for both plants and livestock?
              </span>
              <br />
              ⇒Yes, our platform supports both plant and livestock disease
              detection. Simply select the appropriate category when uploading
              your image.
              <br />
              <span className="font-semibold">
                7. How accurate is the detection?
              </span>
              <br />
              ⇒Our system is highly accurate, but like any AI-based tool, it may
              not be 100% perfect. We recommend using the results as a guide and
              consulting with experts for confirmation and treatment advice.
              <br />
              <span className="font-semibold">
                8. Can I get treatment recommendations after detection?
              </span>
              <br />
              ⇒Yes! Along with the disease diagnosis, we provide recommended
              actions and potential treatments to help you address the issue
              effectively.
              <br />
              <span className="font-semibold">9. Is the service free?</span>
              <br />
              ⇒Our platform offers a free basic service for disease detection.
              We also offer premium services with additional features for users
              who need more in-depth analysis and support.
              <br />
              <span className="font-semibold">
                10. How can I contact support?
              </span>
              <br />
              ⇒If you have any questions or need assistance, you can reach out
              to us through our Contact section, or email us directly at
              support@[website. com]. We’re happy to help!
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

export default FaqHelp;
