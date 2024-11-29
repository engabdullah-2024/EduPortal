import React, { useState, useEffect } from "react";
import { FaEdit, FaEnvelope, FaSave, FaTrashAlt } from "react-icons/fa"; // Icons for Edit, Save, Trash
import { BsFillCameraFill } from "react-icons/bs"; // Icon for camera (profile image upload)
import toast, { Toaster } from "react-hot-toast"; // Import toast and Toaster

const Profile = () => {
  // State to hold user data
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@email.com",
    bio: "Passionate about building innovative solutions to everyday problems. Always striving to learn and grow in the tech field.",
    image: "https://via.placeholder.com/150", // Default image URL
  });

  const [isEditing, setIsEditing] = useState(false); // Track editing mode

  // UseEffect to load user data from localStorage on page load
  useEffect(() => {
    const savedUser = localStorage.getItem("userProfile");
    if (savedUser) {
      setUser(JSON.parse(savedUser)); // Parse the data from localStorage and set it to state
    }
  }, []);

  // Function to handle updating profile data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  // Function to toggle edit mode
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  // Function to handle saving changes to localStorage
  const saveProfile = () => {
    localStorage.setItem("userProfile", JSON.stringify(user)); // Save user data to localStorage
    setIsEditing(false);
    toast.success("Profile updated successfully!"); // Show success toast
  };

  // Function to handle deleting the profile from localStorage
  const deleteProfile = () => {
    localStorage.removeItem("userProfile"); // Remove profile data from localStorage
    setUser({
      name: "",
      email: "",
      bio: "",
      image: "",
    });
    toast.error("Profile deleted successfully!"); // Show error toast
  };

  // Function to handle image upload (mock function for now)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({
          ...user,
          image: reader.result, // Set uploaded image as profile picture
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-blue-500 flex justify-center items-center py-8">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl">
        <div className="flex flex-col items-center space-y-4">
          {/* Profile Image Section */}
          <div className="relative">
            <img
              src={user.image}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
            />
            <label htmlFor="profileImage" className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full cursor-pointer">
              <BsFillCameraFill className="w-5 h-5" />
            </label>
            <input
              type="file"
              id="profileImage"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>

          {/* User Info */}
          <div className="w-full">
            {/* Name Input */}
            <label htmlFor="name" className="block text-lg font-medium text-gray-700">
              Name:
            </label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                id="name"
                value={user.name}
                onChange={handleInputChange}
                className="text-3xl font-semibold text-gray-800 w-full text-center border-b-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <h1 className="text-3xl font-semibold text-gray-800">{user.name}</h1>
            )}
          </div>

          {/* Email Input */}
          <div className="flex items-center space-x-2 text-gray-500 w-full">
            <FaEnvelope className="w-5 h-5" />
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">
              Email:
            </label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                id="email"
                value={user.email}
                onChange={handleInputChange}
                className="text-xl text-gray-600 border-b-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <span>{user.email}</span>
            )}
          </div>

          {/* Bio Input */}
          <div className="w-full mt-4">
            <label htmlFor="bio" className="block text-lg font-medium text-gray-700">
              Bio:
            </label>
            {isEditing ? (
              <textarea
                name="bio"
                id="bio"
                value={user.bio}
                onChange={handleInputChange}
                className="text-center text-gray-700 mt-4 w-full h-24 p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-center text-gray-700 mt-4">{user.bio}</p>
            )}
          </div>

          {/* Buttons for Editing, Saving, and Deleting Profile */}
          <div className="mt-6 flex justify-center space-x-4">
            {isEditing ? (
              <button
                onClick={saveProfile}
                className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              >
                <FaSave className="mr-2" />
                Save Profile
              </button>
            ) : (
              <button
                onClick={toggleEditMode}
                className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              >
                <FaEdit className="mr-2" />
                Edit Profile
              </button>
            )}
            <button
              onClick={deleteProfile}
              className="flex items-center bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
            >
              <FaTrashAlt className="mr-2" />
              Delete Profile
            </button>
          </div>
        </div>
      </div>
      <Toaster /> {/* Add Toaster component to render notifications */}
    </div>
  );
};

export default Profile;
