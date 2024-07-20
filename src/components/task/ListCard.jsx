import React, { useState } from 'react';

const ListCard = ({ status, tasks, setTasks }) => {
    const [isDraggingOver, setIsDraggingOver] = useState(false);

    const handleDrop = (e) => {
        e.preventDefault();
        const id = e.dataTransfer.getData("text/plain");

        const newTasks = tasks.map((item) => {
            if (item.id == id) {
                return { ...item, status: status };
            }
            return item;
        });
        setTasks(newTasks);
        setIsDraggingOver(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDraggingOver(true);
    };

    const handleDragLeave = () => {
        setIsDraggingOver(false);
    };

    const handleDragStart = (e, id) => {
        e.dataTransfer.setData("text/plain", id.toString())
    }
    return (
        <div
            key={status}
            className={`w-full bg-white  px-3 pt-2 border-2 rounded-lg shadow-lg ${isDraggingOver ? "border-dotted border-gray-500  " : "border-gray-300 "}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
        >
            <h2 className="font-semibold text-md mb-2 text-white p-2 bg-blue-500">
                {status.replace(/([A-Z])/g, ' $1').toUpperCase()}
            </h2>
            {tasks.filter(task => task.status === status).map((task) => (
                <div
                    key={task.id}
                    className="p-4 mb-4 rounded-lg shadow-lg bg-blue-200"
                    onDragStart={(e) => handleDragStart(e, task.id)}
                    onDragEnd={handleDragLeave}
                    draggable={true}
                >
                    <h3 className="text-lg font-semibold">{task.title}</h3>
                    <p>{task.description}</p>
                    <p className="text-sm text-gray-600">Created at: {task.createdAt}</p>
                    <div className="flex justify-between mt-2">
                        <button className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
                        <button className="px-2 py-1 bg-yellow-500 text-white rounded">Edit</button>
                        <button className="px-2 py-1 bg-blue-500 text-white rounded">View Details</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ListCard;
