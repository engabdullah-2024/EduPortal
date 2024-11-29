import React from "react";
import { FaHome, FaInfoCircle, FaUserAlt } from "react-icons/fa"; // Importing icons
import { Link } from "react-router-dom"; // Importing Link from react-router-dom

const Header = () => {
  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">EduPortal</h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="flex items-center hover:text-gray-200">
                <FaHome className="mr-2" /> Home
              </Link>
            </li>
            <li>
              <Link to="/results" className="flex items-center hover:text-gray-200">
                <FaInfoCircle className="mr-2" /> Results
              </Link>
            </li>
            <li>
              <Link to="/profile" className="flex items-center hover:text-gray-200">
                <FaUserAlt className="mr-2" /> Profile
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
