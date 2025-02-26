import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

const symptomsData = {
    Cow: ["labored breathing", "nasal discharge", "weight loss", "Fever", "Cough", "Weight Loss", "Skin Lesions", "Blisters on gums", "Blisters on hooves", "Blisters on mouth", "Blisters on tongue", "Chest discomfort", "Chills", "Crackling sound", "Depression", "Difficulty walking", "Fatigue", "Lameness", "Loss of appetite", "Painless lumps", "Shortness of breath", "Sores on gums", "Sores on hooves", "Sores on mouth", "Sores on tongue", "Sweats", "Swelling in abdomen", "Swelling in extremities", "Swelling in limb", "Swelling in muscle", "Swelling in neck"],
    Buffalo: ["labored breathing", "nasal discharge", "weight loss", "Fever", "Cough", "Weight Loss", "Skin Lesions", "Blisters on gums", "Blisters on hooves", "Blisters on mouth", "Blisters on tongue", "Chest discomfort", "Chills", "Crackling sound", "Depression", "Difficulty walking", "Fatigue", "Lameness", "Loss of appetite", "Painless lumps", "Shortness of breath", "Sores on gums", "Sores on hooves", "Sores on mouth", "Sores on tongue", "Sweats", "Swelling in abdomen", "Swelling in extremities", "Swelling in limb", "Swelling in muscle", "Swelling in neck"],
    Goat: ["labored breathing", "nasal discharge", "weight loss", "Fever", "Cough", "Weight Loss", "Skin Lesions", "Blisters on gums", "Blisters on hooves", "Blisters on mouth", "Blisters on tongue", "Chest discomfort", "Chills", "Crackling sound", "Depression", "Difficulty walking", "Fatigue", "Lameness", "Loss of appetite", "Painless lumps", "Shortness of breath", "Sores on gums", "Sores on hooves", "Sores on mouth", "Sores on tongue", "Sweats", "Swelling in abdomen", "Swelling in extremities", "Swelling in limb", "Swelling in muscle", "Swelling in neck"],
    Sheep: ["labored breathing", "nasal discharge", "weight loss", "Fever", "Cough", "Weight Loss", "Skin Lesions", "Blisters on gums", "Blisters on hooves", "Blisters on mouth", "Blisters on tongue", "Chest discomfort", "Chills", "Crackling sound", "Depression", "Difficulty walking", "Fatigue", "Lameness", "Loss of appetite", "Painless lumps", "Shortness of breath", "Sores on gums", "Sores on hooves", "Sores on mouth", "Sores on tongue", "Sweats", "Swelling in abdomen", "Swelling in extremities", "Swelling in limb", "Swelling in muscle", "Swelling in neck"],
};

const DiseaseForm = () => {
    const [selectedAnimal, setSelectedAnimal] = useState("");
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [prediction, setPrediction] = useState(null);
    const [plantPrediction, setPlantPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    });

    const handleAnimalChange = (e) => {
        setSelectedAnimal(e.target.value);
        setSelectedSymptoms([]);
    };

    const handleSymptomChange = (symptom) => {
        if (selectedSymptoms.includes(symptom)) {
            setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
        } else if (selectedSymptoms.length < 3) {
            setSelectedSymptoms([...selectedSymptoms, symptom]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedAnimal || selectedSymptoms.length === 0) {
            alert("Please select an animal and at least one symptom.");
            return;
        }
        setLoading(true);
        setError(null);
        try {
                const response = await fetch("https://adiai00-livestock-plant-disease-api.hf.space/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ symptoms: [selectedAnimal, ...selectedSymptoms] })
            });
            if (!response.ok) throw new Error("Failed to fetch prediction");
            setPrediction(await response.json());
        } catch (err) {
            setError(err.message);
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
        setError(null);
        const formData = new FormData();
        formData.append("file", image);
        try {
            const response = await fetch("https://adiai00-livestock-plant-disease-api.hf.space/predict-plant", {
                method: "POST",
                body: formData,
            });
            if (!response.ok) throw new Error("Failed to fetch plant disease prediction");
            setPlantPrediction(await response.json());
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-slate-900" style={{ textAlign: "center", marginTop: "20px" }}>
            <h2 className="text-[30px] mt-20 md:text-4xl text-black dark:text-white font-bold">Livestock Disease Prediction</h2>
            <form onSubmit={handleSubmit}>
                <h3 className="p-4">Select an Animal</h3>
                <select 
    value={selectedAnimal} 
    onChange={handleAnimalChange} 
    required 
    className="bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-600 p-2 rounded-md"
>
    <option value="" className="text-black dark:text-white">-- Select Animal --</option>
    <option value="Cow" className="text-black dark:text-white">Cow</option>
    <option value="Buffalo" className="text-black dark:text-white">Buffalo</option>
    <option value="Goat" className="text-black dark:text-white">Goat</option>
    <option value="Sheep" className="text-black dark:text-white">Sheep</option>
</select>

                {selectedAnimal && (
                    <>
                        <h3>Select Symptoms (Max 3)</h3>
                        {symptomsData[selectedAnimal].map((symptom, index) => (
                            <label className="justify-between" key={index}>
                                <input
                                    type="checkbox"
                                    value={symptom}
                                    checked={selectedSymptoms.includes(symptom)}
                                    onChange={() => handleSymptomChange(symptom)}
                                    disabled={selectedSymptoms.length >= 3 && !selectedSymptoms.includes(symptom)}
                                />
                                {symptom}
                            </label>
                        ))}
                    </>
                )}
                <div>
                <button className="bg-green-700 hover:bg-green-800 p-4 m-4 rounded-md font-bold text-2xl text-center text-black dark:text-white" type="submit" disabled={selectedSymptoms.length === 0}>Predict Livestock Disease</button></div>
            </form>
            {prediction && <p><strong>{prediction.disease}</strong> - {Math.round(prediction.confidence * 100)}%</p>}
            <form onSubmit={handleImageSubmit}>


                <h3 className="text-[30px] md:text-4xl text-black dark:text-white font-bold mt-8" >Plant Disease Detection</h3>
                <div className="flex justify-center mt-5 m-4">
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
            <p className="text-black dark:text-white">Drag & drop an image here, or click to select one</p>
        )}
    </div>
</div>



                
                <button className="bg-green-700 mb-10 hover:bg-green-800 p-4 rounded-md font-bold text-2xl text-center text-black dark:text-white " type="submit">Predict Plant Disease</button>
            </form>
            {plantPrediction && <p><strong>{plantPrediction.disease}</strong> - {Math.round(plantPrediction.confidence * 100)}%</p>}
        </div>
    );
};

export default DiseaseForm;
