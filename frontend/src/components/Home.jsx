import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Banner from './Banner';
import Create from './Create';
import axios from 'axios';

const Home = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null); 


    

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get("http://localhost:3000/tasks");
                setTasks(response.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, []); 

    const handleCreateTask = () => {
        setEditingTask(null); 
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleTaskCreated = (newTask) => {
        setTasks((prevTasks) => {
            if (editingTask) {
                return prevTasks.map((task) => (task.id === newTask.id ? newTask : task));
            } else {
                return [...prevTasks, newTask];
            }
        });
    };

    const handleEditTask = (task) => {
        setEditingTask(task); 
        setModalOpen(true); 
    };

    const handleDeleteTask = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/tasks/${id}`);
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    return (
        <div>
            <Navbar onCreateTask={handleCreateTask} />
            <Banner tasks={tasks} onTaskEdited={handleEditTask} onTaskDeleted={handleDeleteTask} />
            <Create
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onTaskCreated={handleTaskCreated}
                editingTask={editingTask} 
            />
        </div>
    );
};

export default Home;
