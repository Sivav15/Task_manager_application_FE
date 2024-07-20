// src/components/Task.jsx
import React, { useState } from 'react';
import Header from '../components/task/Header';
import ListCard from '../components/task/ListCard';



const Task = () => {
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Task 1', description: 'Description 1', status: 'todo', createdAt: '01/09/2021, 05:30:00' },
        { id: 2, title: 'Task 2', description: 'Description 2', status: 'todo', createdAt: '01/09/2021, 05:30:00' },
        { id: 3, title: 'Task 3', description: 'Description 3', status: 'todo', createdAt: '01/09/2021, 05:30:00' },
        { id: 4, title: 'Task 4', description: 'Description 4', status: 'inProgress', createdAt: '01/09/2021, 05:30:00' },
        { id: 5, title: 'Task 5', description: 'Description 5', status: 'inProgress', createdAt: '01/09/2021, 05:30:00' },
        { id: 6, title: 'Task 6', description: 'Description 6', status: 'done', createdAt: '01/09/2021, 05:30:00' },
    ])

    return (
        <div className="p-4 w-full xl:w-[85%]">
            <Header />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2" >
                {['todo', 'inProgress', 'done'].map((status, index) => (
                    <ListCard tasks={tasks} status={status} setTasks={setTasks} key={index} />
                ))}
            </div>
        </div>
    );
};

export default Task;
