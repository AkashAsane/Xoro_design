import React from "react";

const Navbar = ({ onCreateTask }) => {

    
  return (
    <div className="navbar bg-teal-600 md:px-20">
      <div className="navbar-start"></div>
      <div className="navbar-center">
        <h2 className="md:text-2xl font-extrabold">Task Management</h2>
      </div>
      <div className="navbar-end ">
       
        <div className="">
          <button className="bg-black text-white rounded-md p-2" onClick={onCreateTask}>Create</button>
        </div>
        <div className="m-2">
          <button className="bg-red-500 text-white rounded-md p-2">
            Login
          </button>
        </div>

      </div>
    </div>
  );
};

export default Navbar;
