import { useState } from "react";
import { db } from "./Firsebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth } from "./Firebaseconfig";

export default function NotificationForm() {
  const [message, setMessage] = useState("");

  const sendNotification = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("Please log in to send notifications.");
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          const location = data.address
            ? `${
                data.address.village ||
                data.address.town ||
                data.address.city ||
                data.address.state ||
                "Unknown"
              }, ${data.address.country || "Unknown"}`
            : "Location not found";

          await addDoc(collection(db, "notifications"), {
            message: message || "New Firestore Notification!",
            location,
            timestamp: serverTimestamp(),
            userId: user.uid, // Store the logged-in user's ID
          });
          alert("Notification Send!");

          setMessage(""); // Clear input after sending
        } catch (error) {
          console.error("Error fetching location details:", error);
        }
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="flex flex-col md:ml-96 md:mr-96 p-10 bg-white dark:bg-slate-900">
      <h1 className="font-bold text-black dark:text-white">
        Enter your message(Please don't include your personal details.):
      </h1>
      <input
        className="mt-4 bg-gray-300 dark:bg-white rounded-md text-black dark:text-black"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Example: Alert!!! Lumpy virus is spreading in Westbengal."
        style={{ padding: "10px", fontSize: "16px", marginRight: "10px" }}
      />
      <button
        className="bg-black text-white dark:bg-gray-500 dark:text-black mt-4 rounded-md"
        onClick={sendNotification}
        style={{ padding: "10px", fontSize: "16px", cursor: "pointer" }}
      >
        Send Notification
      </button>
    </div>
  );
}
