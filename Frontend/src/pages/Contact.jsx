import React, { useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';


function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission with a timeout
    setTimeout(() => {
      setShowPopup(true);
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    }, 500); // Show popup after 3 seconds
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
     <div className="bg-[url('/img1.png')] bg-cover md:bg-center bg-[right] bg-fixed absolute top-0 left-0 w-full h-full z-0 dark:bg-[url('/img2.png')] dark:bg-cover md:dark:bg-[center_top] dark:bg-[right] dark:bg-fixed pt-5">
     <Navbar/>
    <div className="max-w-screen-lg mx-auto m-[100px] p-4">
    <h1
      className="md:text-3xl text-2xl font-bold mb-4 text-center text-black dark:text-white"
      style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}
    >
      Contact Us
    </h1>
      <form onSubmit={handleSubmit} className="space-y-4 text-black">
        <div>
          <label className="block text-sm font-medium mb-1 text-black " htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded bg-white"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-black " htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded bg-white"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-black " htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded bg-white"
            rows="4"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-black text-white rounded hover:bg-gray-800"
        >
          Send Message
        </button>
      </form>

      {/* Popup for thank you message */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded shadow-lg text-center dark:bg-gray-900 dark:text-white">
            <p className="text-lg font-semibold">Thank you for contacting us!</p>
            <button
              onClick={closePopup}
              className="mt-4 px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded dark:hover:bg-gray-200 hover:bg-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
    <Footer/>
    </div>
    </>
  );
}

export default ContactPage;
