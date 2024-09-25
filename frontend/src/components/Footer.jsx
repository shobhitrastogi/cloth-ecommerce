// src/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-4">
        
        {/* Logo and Description */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl font-bold">ShopMate</h1>
            <p>Your one-stop shop for everything!</p>
          </div>
          <div>
            <ul className="flex space-x-4">
              <li><a href="#about" className="hover:underline">About Us</a></li>
              <li><a href="#contact" className="hover:underline">Contact</a></li>
              <li><a href="#privacy" className="hover:underline">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Links Section */}
        <div className="flex flex-col md:flex-row justify-between text-sm">
          <div>
            <h2 className="font-semibold mb-2">Follow Us</h2>
            <ul className="flex space-x-4">
              <li><a href="#facebook" className="hover:underline">Facebook</a></li>
              <li><a href="#twitter" className="hover:underline">Twitter</a></li>
              <li><a href="#instagram" className="hover:underline">Instagram</a></li>
            </ul>
          </div>

          <div>
            &copy; {new Date().getFullYear()} ShopMate. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
