import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";  // Import Profile page


import Header from "./components/Header";  // Import Header page
import Footer from "./components/Footer";  // Import Footer page
import MakeID from "./components/MakeID";
import IDResult from "./components/IDResult";

function App() {
  ;

  return (
    <Router>
      <Header /> {/* Include the Header component */}

      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Routes>
          <Route path="/" element={<MakeID />} />  {/* Home page route */}
          <Route path="/results" element={<IDResult />} />  {/* About page route */}
          <Route path="/profile" element={<Profile />} />  {/* Profile page route */}
        </Routes>
      </div>

      <Footer /> {/* Include the Footer component */}
    </Router>
  );
}

export default App;
