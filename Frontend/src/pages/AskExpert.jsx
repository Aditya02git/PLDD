import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API_KEY = "AIzaSyBPgDAssGaJDSmBkPhMWLFJvjpq9jBgGrA";

const AskExpert = () => {
  const [location, setLocation] = useState("");
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expertsLoading, setExpertsLoading] = useState(false);

  // Get User Location
  const getUserLocation = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://ipapi.co/json/");
      const userLocation = `${res.data.city}, ${res.data.region}, ${res.data.country_name}`;
      setLocation(userLocation);
      setLoading(false);

      // Called Gemini API with the location
      getExperts(userLocation);
    } catch (error) {
      console.error("Error fetching location:", error);
      setLoading(false);
    }
  };

  // Get Experts from Gemini API
  const getExperts = async (location) => {
    try {
      setExpertsLoading(true);
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        {
          contents: [
            {
              parts: [
                {
                  text: `List top plant and livestock disease experts in ${location}. Include their name, location, expertise, and website (if available).`,
                },
              ],
            },
          ],
        }
      );

      const textResponse = response.data.candidates[0].content.parts[0].text;
      const expertsList = textResponse.split("\n\n"); // Convert response to array
      setExperts(expertsList);
    } catch (error) {
      console.error("Error fetching experts:", error);
    } finally {
      setExpertsLoading(false);
    }
  };
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.lordicon.com/lordicon.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <Navbar />
      <div
        className=" items-center justify-center  text-black dark:text-white bg-white dark:bg-slate-900"
        style={{ textAlign: "center", padding: "20px" }}
      >
        <button
          className="text-black dark:text-black bg-slate-300 hover:shadow-slate-500 dark:hover:shadow-slate-500 transition-hover hover:shadow-xl  duration-300 mt-40 rounded-box p-10 hover:p-9 "
          onClick={getUserLocation}
          disabled={loading || expertsLoading}
        >
          <div>
            <lord-icon
              src="https://cdn.lordicon.com/yudxjmzy.json"
              trigger="click"
              style={{ width: "250px", height: "250px" }}
            ></lord-icon>
          </div>
          {loading ? "Detecting Location..." : "Find Experts"}
        </button>

        {location && (
          <h3 className="pt-16 text-black dark:text-white">
            Experts in {location}:
          </h3>
        )}

        {expertsLoading && (
          <p className=" text-black dark:text-white"> ◌ Loading experts...</p>
        )}

        {!expertsLoading && experts.length > 0 && (
          <>
            <ul
              className="text-black dark:text-white bg-gray-300 dark:bg-slate-700 p-10 m-5 rounded-lg flex-wrap"
              style={{ textAlign: "left", display: "inline-block" }}
            >
              {experts.map((expert, index) => (
                <li key={index}>{expert}</li>
              ))}
            </ul>

            <br />
            <a
              className=" transiton-hover duration-300  text-black dark:text-white"
              href={`https://www.google.com/maps/search/?api=1&query=plant+and+livestock+disease+expert+in+${encodeURIComponent(
                location
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                marginTop: "10px",
                padding: "10px 20px",
                background: "#28a745",
                textDecoration: "none",
                borderRadius: "5px",
              }}
            >
              Find Experts on Google Maps
              <div>
                <lord-icon
                  src="https://cdn.lordicon.com/ebfcponz.json"
                  trigger="hover"
                  style={{ width: "50px", height: "50px" }}
                ></lord-icon>
              </div>
            </a>
          </>
        )}
      </div>

      <Footer />
    </>
  );
};

export default AskExpert;
