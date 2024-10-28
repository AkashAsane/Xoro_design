import React, { useEffect, useState } from "react";


const Banner = ({ tasks, onTaskEdited, onTaskDeleted }) => {
  const handleEdit = (task) => {
    onTaskEdited(task); 
  };

 
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Task List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white shadow-lg rounded-lg p-5 transition-transform transform hover:scale-105"
          >
            <h2 className="text-xl font-semibold mb-2">{task.title}</h2>
            <p className="text-gray-700 mb-4">{task.description}</p>
            <div className="">
              <button
                onClick={() => handleEdit(task)}
                className="bg-teal-500 text-white px-4 py-2 m-2 rounded hover:bg-teal-700 transition"
              >
                Edit
              </button>
              <button
                onClick={() => onTaskDeleted(task.id)}
                className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
