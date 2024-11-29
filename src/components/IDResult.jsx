import React, { useState, useEffect } from "react";
import { AiFillEdit, AiFillDelete, AiOutlineCheck } from "react-icons/ai";
import { toast, Toaster } from "react-hot-toast"; // Import toast and Toaster

const IDResult = () => {
  const [students, setStudents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedStudent, setEditedStudent] = useState({
    name: "",
    class: "",
    result: "",
    school: "",
    image: "",
  });

  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem("students")) || [];
    setStudents(storedStudents);
  }, []);

  const handleDelete = (id) => {
    const updatedStudents = students.filter((student) => student.id !== id);
    setStudents(updatedStudents);
    localStorage.setItem("students", JSON.stringify(updatedStudents));

    toast.success("Student deleted successfully!");  // Display success toast
  };

  const handleEdit = (student) => {
    setEditingId(student.id);
    setEditedStudent({
      name: student.name,
      class: student.class,
      result: student.result,
      school: student.school,
      image: student.image || "", // If there's an existing image, set it, otherwise empty
    });
  };

  const handleSave = (id) => {
    const updatedStudents = students.map((student) =>
      student.id === id ? { ...student, ...editedStudent } : student
    );
    setStudents(updatedStudents);
    localStorage.setItem("students", JSON.stringify(updatedStudents));
    setEditingId(null); // Exit editing mode
    setEditedStudent({
      name: "",
      class: "",
      result: "",
      school: "",
      image: "",
    });

    toast.success("Student updated successfully!");  // Display success toast
  };

  const handleChange = (e) => {
    setEditedStudent({ ...editedStudent, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setEditedStudent({ ...editedStudent, image: imageUrl });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 flex flex-col items-center py-10">
      <h1 className="text-4xl font-semibold text-gray-800 mb-6">Student List</h1>
      {students.map((student) => (
        <div
          key={student.id}
          className="bg-white shadow-lg rounded-lg w-full sm:w-96 p-6 mb-6 flex flex-col items-center"
        >
          <img
            src={student.image || "https://via.placeholder.com/150"}
            alt={student.name}
            className="h-28 w-28 object-cover rounded-full mb-4"
          />
          <h2 className="text-2xl font-semibold text-gray-800">{student.name}</h2>
          <p className="text-gray-600 mt-2">{student.class}</p>
          <p className="text-gray-600 mt-1">{student.school}</p>

          {/* Inline Editing for All Fields */}
          {editingId === student.id ? (
            <div className="w-full mt-4 space-y-3">
              <input
                type="text"
                name="name"
                value={editedStudent.name}
                onChange={handleChange}
                className="w-full py-2 px-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Name"
              />
              <input
                type="text"
                name="class"
                value={editedStudent.class}
                onChange={handleChange}
                className="w-full py-2 px-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Class"
              />
              <input
                type="text"
                name="result"
                value={editedStudent.result}
                onChange={handleChange}
                className="w-full py-2 px-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Result"
              />
              <input
                type="text"
                name="school"
                value={editedStudent.school}
                onChange={handleChange}
                className="w-full py-2 px-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="School"
              />
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                className="w-full py-2 px-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => handleSave(student.id)}
                className="flex items-center bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-md w-full"
              >
                <AiOutlineCheck className="mr-2" /> Save
              </button>
            </div>
          ) : (
            <div className="text-center mt-4 space-y-2">
              <p><strong>Name: </strong>{student.name}</p>
              <p><strong>Class: </strong>{student.class}</p>
              <p><strong>Result: </strong>{student.result}</p>
              <p><strong>School: </strong>{student.school}</p>
            </div>
          )}

          <div className="flex justify-around w-full mt-6">
            <button
              onClick={() => handleEdit(student)}
              className="flex items-center bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-md"
            >
              <AiFillEdit className="mr-2" /> Edit
            </button>
            <button
              onClick={() => handleDelete(student.id)}
              className="flex items-center bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-md"
            >
              <AiFillDelete className="mr-2" /> Delete
            </button>
          </div>
        </div>
      ))}

      {/* Toaster component to display toast notifications */}
      <Toaster />
    </div>
  );
};

export default IDResult;
