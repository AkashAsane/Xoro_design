import React, { useState, useEffect } from "react";
import axios from "axios";

const Create = ({ isOpen, onClose, onTaskCreated, editingTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTask) {
   
        const response = await axios.put(`http://localhost:3000/tasks/${editingTask.id}`, {
          title,
          description,
        });
        onTaskCreated(response.data); 
      } else {
     
        const response = await axios.post("http://localhost:3000/tasks", {
          title,
          description,
        });
        onTaskCreated(response.data); 
      }
      onClose(); 
    } catch (error) {
      console.error("Error creating/updating task:", error);
    }
  };

  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-1/3">
        <h2 className="text-2xl mb-4">{editingTask ? "Edit Task" : "Create New Task"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded w-full p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded w-full p-2"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {editingTask ? "Update Task" : "Create Task"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="ml-2 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
