import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
<footer className="bg-slate-100 py-8 dark:bg-slate-800">
  <div className="container mx-auto px-4">
    {/* Top Section: About and Links */}
    <div className="md:grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* About Section */}
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-2 text-black dark:text-white">About Us</h2>
        <p className="text-gray-400 text-sm">
        Empowering farmers with knowledge to protect crops and livestock, ensuring healthier futures
        </p>
      </div>

      {/* Quick Links */}
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-2 text-black dark:text-white">Quick Links</h2>
        <ul className="text-gray-400 text-sm space-y-2">
          <li><Link to="/home" className="hover:text-black">Home</Link></li>
          <li><Link to="/diseasedetection" className="hover:text-black">Disease Detection</Link></li>
          <li><Link to="/contact" className="hover:text-black">Contact Us</Link></li>
          <li><Link to="/aboutus" className="hover:text-black">About us</Link></li>
          <li><Link to="#" className="hover:text-black">Privacy Policy</Link></li>
          <li><Link to="#" className="hover:text-black">Terms & Conditions</Link></li>
        </ul>
      </div>

      {/* Contact Information */}
      <div>
        <h2 className="text-lg font-bold mb-2 text-black dark:text-white">Contact Us</h2>
        <p className="text-gray-400 text-sm">
          Email: 5mincare@gmail.com<br />
        
        </p>
      </div>
    </div>

    {/* Middle Section: Newsletter and Social Icons */}
    <div className="my-8 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
      {/* Newsletter Subscription */}
      <div className="mb-6 sm:mb-0">
        <h2 className="text-lg font-bold mb-2 text-black dark:text-white">Subscribe to Our Newsletter</h2>
        <form className="flex flex-col sm:flex-row gap-4 sm:gap-0">
          <input 
            type="text" 
            placeholder="Your email" 
            className="p-2 rounded bg-white text-black focus:outline-none w-full sm:w-auto"
          />
          <button className="p-2 bg-black text-white rounded hover:opacity-70 duration-300 cursor-pointer mt-2 sm:mt-0 sm:ml-2">Subscribe</button>
        </form>
      </div>

      {/* Social Media Icons */}
      <div className="flex flex-wrap justify-center sm:justify-end gap-4">
        <a href="#" className="text-gray-400 hover:text-black flex items-center space-x-2">
          <FontAwesomeIcon icon={faFacebook} />
          <span className="hidden sm:inline">Facebook</span>
        </a>
        <a href="#" className="text-gray-400 hover:text-black flex items-center space-x-2">
          <FontAwesomeIcon icon={faTwitter} />
          <span className="hidden sm:inline">Twitter</span>
        </a>
        <a href="#" className="text-gray-400 hover:text-black flex items-center space-x-2">
          <FontAwesomeIcon icon={faLinkedin} />
          <span className="hidden sm:inline">LinkedIn</span>
        </a>
      </div>
    </div>

    {/* Bottom Section: Copyright */}
    <div className="text-center text-gray-400 text-sm mt-6">
      <p>© 2024 Gujarat Innovation & Research-Hub. All rights reserved.</p>
    </div>
  </div>
</footer>

  );
}

export default Footer;
