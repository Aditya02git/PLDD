import React, { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NotificationForm from "../components/NotificationForm";

const symptomsData = {
  Cow: [
    "labored breathing",
    "nasal discharge",
    "weight loss",
    "Fever",
    "Cough",
    "Weight Loss",
    "Skin Lesions",
    "Blisters on gums",
    "Blisters on hooves",
    "Blisters on mouth",
    "Blisters on tongue",
    "Chest discomfort",
    "Chills",
    "Crackling sound",
    "Depression",
    "Difficulty walking",
    "Fatigue",
    "Lameness",
    "Loss of appetite",
    "Painless lumps",
    "Shortness of breath",
    "Sores on gums",
    "Sores on hooves",
    "Sores on mouth",
    "Sores on tongue",
    "Sweats",
    "Swelling in abdomen",
    "Swelling in extremities",
    "Swelling in limb",
    "Swelling in muscle",
    "Swelling in neck",
  ],
  Buffalo: [
    "labored breathing",
    "nasal discharge",
    "weight loss",
    "Fever",
    "Cough",
    "Weight Loss",
    "Skin Lesions",
    "Blisters on gums",
    "Blisters on hooves",
    "Blisters on mouth",
    "Blisters on tongue",
    "Chest discomfort",
    "Chills",
    "Crackling sound",
    "Depression",
    "Difficulty walking",
    "Fatigue",
    "Lameness",
    "Loss of appetite",
    "Painless lumps",
    "Shortness of breath",
    "Sores on gums",
    "Sores on hooves",
    "Sores on mouth",
    "Sores on tongue",
    "Sweats",
    "Swelling in abdomen",
    "Swelling in extremities",
    "Swelling in limb",
    "Swelling in muscle",
    "Swelling in neck",
  ],
  Goat: [
    "labored breathing",
    "nasal discharge",
    "weight loss",
    "Fever",
    "Cough",
    "Weight Loss",
    "Skin Lesions",
    "Blisters on gums",
    "Blisters on hooves",
    "Blisters on mouth",
    "Blisters on tongue",
    "Chest discomfort",
    "Chills",
    "Crackling sound",
    "Depression",
    "Difficulty walking",
    "Fatigue",
    "Lameness",
    "Loss of appetite",
    "Painless lumps",
    "Shortness of breath",
    "Sores on gums",
    "Sores on hooves",
    "Sores on mouth",
    "Sores on tongue",
    "Sweats",
    "Swelling in abdomen",
    "Swelling in extremities",
    "Swelling in limb",
    "Swelling in muscle",
    "Swelling in neck",
  ],
  Sheep: [
    "labored breathing",
    "nasal discharge",
    "weight loss",
    "Fever",
    "Cough",
    "Weight Loss",
    "Skin Lesions",
    "Blisters on gums",
    "Blisters on hooves",
    "Blisters on mouth",
    "Blisters on tongue",
    "Chest discomfort",
    "Chills",
    "Crackling sound",
    "Depression",
    "Difficulty walking",
    "Fatigue",
    "Lameness",
    "Loss of appetite",
    "Painless lumps",
    "Shortness of breath",
    "Sores on gums",
    "Sores on hooves",
    "Sores on mouth",
    "Sores on tongue",
    "Sweats",
    "Swelling in abdomen",
    "Swelling in extremities",
    "Swelling in limb",
    "Swelling in muscle",
    "Swelling in neck",
  ],
};
const DiseaseForm = () => {
  const [selectedAnimal, setSelectedAnimal] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [plantPrediction, setPlantPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchingLivestock, setFetchingLivestock] = useState(false);
  const [fetchingPlant, setFetchingPlant] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [livestockSolutions, setLivestockSolutions] = useState([]);
  const [plantSolutions, setPlantSolutions] = useState([]);

  const fetchSolutions = async (disease, type) => {
    if (!disease) {
      alert("No disease detected. Predict first!");
      return;
    }
    type === "livestock" ? setFetchingLivestock(true) : setFetchingPlant(true);
    try {
      const API_KEY = "AIzaSyBPgDAssGaJDSmBkPhMWLFJvjpq9jBgGrA";
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        {
          contents: [
            {
              parts: [
                {
                  text: `Provide natural or traditional remedies historically used for ${disease}, focusing on supportive care, hygiene, and prevention in brief points.`,
                },
              ],
            },
          ],
        }
      );
      const text =
        response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No solutions found.";
      const solutionsList = text
        .split("\n")
        .filter((line) => line.trim() !== "");

      if (type === "livestock") setLivestockSolutions(solutionsList);
      if (type === "plant") setPlantSolutions(solutionsList);
    } catch (err) {
      alert("Failed to fetch solutions. Please try again.");
    }
    type === "livestock"
      ? setFetchingLivestock(false)
      : setFetchingPlant(false);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    },
  });

  const handleAnimalChange = (e) => {
    setSelectedAnimal(e.target.value);
    setSelectedSymptoms([]);
  };

  const handleSymptomChange = (symptom) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : prev.length < 3
        ? [...prev, symptom]
        : prev
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAnimal || selectedSymptoms.length === 0) {
      alert("Please select an animal and at least one symptom.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        "https://adiai00-livestock-plant-disease-api.hf.space/predict",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            symptoms: [selectedAnimal, ...selectedSymptoms],
          }),
        }
      );
      if (!response.ok) throw new Error("Failed to fetch prediction");
      const data = await response.json();
      setPrediction(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert("Please upload an image first.");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("file", image);
    try {
      const response = await fetch(
        "https://adiai00-livestock-plant-disease-api.hf.space/predict-plant",
        {
          method: "POST",
          body: formData,
        }
      );
      if (!response.ok)
        throw new Error("Failed to fetch plant disease prediction");
      const data = await response.json();
      setPlantPrediction(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div
        className="bg-white dark:bg-slate-900 p-10 text-black dark:text-white"
        style={{ textAlign: "center", marginTop: "95px" }}
      >
        <h2 className="text-[30px] md:text-4xl text-black dark:text-white font-bold mt-8">
          Livestock Disease Prediction
        </h2>
        <form onSubmit={handleSubmit}>
          <h3>Select an Animal</h3>
          <select
            value={selectedAnimal}
            onChange={handleAnimalChange}
            required
            className="bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-600 p-2 rounded-md"
          >
            <option value="" className="text-black dark:text-white">
              -- Select Animal --
            </option>
            <option value="Cow" className="text-black dark:text-white">
              Cow
            </option>
            <option value="Buffalo" className="text-black dark:text-white">
              Buffalo
            </option>
            <option value="Goat" className="text-black dark:text-white">
              Goat
            </option>
            <option value="Sheep" className="text-black dark:text-white">
              Sheep
            </option>
          </select>
          {selectedAnimal && (
            <>
              <h3 className="text-black dark:text-white">
                Select Symptoms (Max 3)
              </h3>
              {symptomsData[selectedAnimal].map((symptom, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    value={symptom}
                    checked={selectedSymptoms.includes(symptom)}
                    onChange={() => handleSymptomChange(symptom)}
                    disabled={
                      selectedSymptoms.length >= 3 &&
                      !selectedSymptoms.includes(symptom)
                    }
                  />
                  {symptom}
                </label>
              ))}
            </>
          )}
          <div>
            <button
              className="bg-green-700 hover:bg-green-800 m-4 p-4 rounded-md font-bold text-2xl text-center text-black dark:text-white "
              type="submit"
              disabled={loading}
            >
              {loading ? "Predicting..." : "Predict Livestock Disease"}
            </button>
          </div>
        </form>
        {prediction && (
          <p>
            <strong>{prediction.disease}</strong> -{" "}
            {Math.round(prediction.confidence * 100)}%
          </p>
        )}
        {prediction && (
          <button
            className="bg-yellow-300 hover:bg-yellow-200 p-4 m-4 rounded-md font-bold text-2xl text-center text-black dark:text-white "
            onClick={() => fetchSolutions(prediction.disease, "livestock")}
            disabled={fetchingLivestock}
          >
            {fetchingLivestock ? "Fetching..." : "Find Homemade Solution"}
          </button>
        )}

        <div>
          <h1 className="text-2xl font-semibold underline text-center text-black dark:text-white">
            Homemade Solutions for Livestock Disease
          </h1>
          {fetchingLivestock ? (
            <p>⏳ Loading solutions...</p>
          ) : (
            <ul className="bg-gray-300 dark:bg-slate-700 border-2 rounded-2xl p-4 flex justify-left flex-wrap">
              {livestockSolutions.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          )}
        </div>

        <hr className="m-4 border-t-2 border-gray-500 dark:border-gray-500" />
        <form onSubmit={handleImageSubmit}>
          <h3 className="text-[30px] md:text-4xl text-black dark:text-white font-bold mt-8">
            Plant Disease Detection
          </h3>
          <div className="flex justify-center mt-5">
            <div
              {...getRootProps()}
              className="border-2 border-dashed border-gray-300 dark:border-gray-600 
                   w-[300px] h-[300px] flex justify-center items-center 
                   overflow-hidden cursor-pointer text-center 
                   bg-gray-100 dark:bg-gray-800"
            >
              <input {...getInputProps()} />
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <p className="text-black dark:text-white">
                  Drag & drop an image here, or click to select one
                </p>
              )}
            </div>
          </div>

          <button
            className="bg-green-700 hover:bg-green-800 p-4 m-4 rounded-md font-bold text-2xl text-center text-black dark:text-white "
            type="submit"
            disabled={loading}
          >
            {loading ? "Predicting..." : "Predict Plant Disease"}
          </button>
        </form>
        {plantPrediction && (
          <p>
            <strong>{plantPrediction.disease}</strong> -{" "}
            {Math.round(plantPrediction.confidence * 100)}%
          </p>
        )}
        {plantPrediction && (
          <button
            className="bg-yellow-300 hover:bg-yellow-200 p-4 m-4 rounded-md font-bold text-2xl text-center text-black dark:text-white "
            onClick={() => fetchSolutions(plantPrediction.disease, "plant")}
            disabled={fetchingPlant}
          >
            {fetchingPlant ? "Fetching..." : "Find Homemade Solution"}
          </button>
        )}

        <div>
          <h1 className="text-2xl font-semibold underline text-center text-black dark:text-white">
            Homemade Solutions for Plant Disease
          </h1>
          {fetchingPlant ? (
            <p>⏳ Loading solutions...</p>
          ) : (
            <ul className=" bg-gray-300 dark:bg-slate-700 border-2 rounded-2xl p-4 flex justify-left flex-wrap">
              {plantSolutions.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
      
      <NotificationForm />
      <Footer />
    </>
  );
};

export default DiseaseForm;
