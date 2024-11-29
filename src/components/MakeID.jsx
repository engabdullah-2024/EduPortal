import React, { useState, useEffect } from "react";
import { AiOutlineUser, AiOutlineIdcard } from "react-icons/ai";
import { FaSchool } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast"; // Import toast and Toaster

const MakeID = ({ studentToEdit, onSave }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    class: "",
    school: "",
    result: "",
    image: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (studentToEdit) {
      setFormData(studentToEdit);
    }
  }, [studentToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Retrieve existing students from local storage
    const storedStudents = JSON.parse(localStorage.getItem("students")) || [];

    // Check if the student already exists based on ID
    const existingStudentIndex = storedStudents.findIndex(
      (student) => student.id === formData.id
    );

    if (existingStudentIndex !== -1) {
      // Update existing student
      storedStudents[existingStudentIndex] = formData;
    } else {
      // Add new student
      storedStudents.push(formData);
    }

    // Save updated array back to local storage
    localStorage.setItem("students", JSON.stringify(storedStudents));

    // Clear the form after saving
    setFormData({
      id: "",
      name: "",
      class: "",
      school: "",
      result: "",
      image: "",
    });

    // Display success toast
    toast.success("Student saved successfully!");

    // Navigate to the student list or confirmation page
    navigate("/id-result");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <Toaster /> {/* Use Toaster to render the toasts */}
      <h1 className="text-3xl font-bold mb-6">Student Form</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-96"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">ID</label>
          <div className="flex items-center border border-gray-300 rounded">
            <AiOutlineIdcard className="text-gray-500 mx-2" />
            <input
              name="id"
              type="text"
              placeholder="Enter ID"
              value={formData.id}
              onChange={handleChange}
              className="w-full py-2 px-3 border-none focus:outline-none"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Name</label>
          <div className="flex items-center border border-gray-300 rounded">
            <AiOutlineUser className="text-gray-500 mx-2" />
            <input
              name="name"
              type="text"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full py-2 px-3 border-none focus:outline-none"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Class</label>
          <div className="flex items-center border border-gray-300 rounded">
            <FaSchool className="text-gray-500 mx-2" />
            <input
              name="class"
              type="text"
              placeholder="Enter Class"
              value={formData.class}
              onChange={handleChange}
              className="w-full py-2 px-3 border-none focus:outline-none"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Result</label>
          <input
            name="result"
            type="text"
            placeholder="Enter Result (e.g., Pass/Fail)"
            value={formData.result}
            onChange={handleChange}
            className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">School</label>
          <input
            name="school"
            type="text"
            placeholder="Enter School Name"
            value={formData.school}
            onChange={handleChange}
            className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
          {formData.image && (
            <img
              src={formData.image}
              alt="Student"
              className="mt-4 h-20 w-20 object-cover rounded-full"
            />
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save Student
        </button>
      </form>
    </div>
  );
};

export default MakeID;
