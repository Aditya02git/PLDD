import React from "react";
import { auth } from "./Firebaseconfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged Out!");
      navigate("/login");
    } catch (error) {
      alert("Error Logging Out");
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
