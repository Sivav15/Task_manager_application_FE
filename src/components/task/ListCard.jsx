import React, { useState } from 'react';
import EditTaskModal from './EditTaskModal';
import { deleteTask_api, updateTask_api } from '../../services/api';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { tasksReducer } from '../../features/tasksSlice';
import useSnackbar from '../../hooks/useSnackbar';
import useLoadingModal from '../../hooks/useLoadingModal';

const ListCard = ({ status, tasks }) => {
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({});
    const { token, id } = useSelector((state) => state.auth.auth);
    const dispatch = useDispatch()
    // const tasks = useSelector((state) => state.tasks.tasks);
    const { showSnackbar, SnackbarComponent } = useSnackbar();
    const { showLoading, hideLoading, LoadingModalComponent } = useLoadingModal();

    const handleClose = () => {
        setOpen(false);
    };


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleDrop = async (e) => {
        try {
            e.preventDefault();
            const id = e.dataTransfer.getData("text/plain");

            const newTasks = tasks.map((item) => {
                if (item._id == id) {
                    return { ...item, status: status };
                }
                return item;
            });

            const findObj = await newTasks.find((item) => item._id == id);



            dispatch(tasksReducer(newTasks))


            setIsDraggingOver(false);

            const res = await axios.put(`${updateTask_api}/${id}`, findObj, {
                headers: {
                    'Authorization': `Bearer ${token}`

                }
            });

        } catch (error) {
            console.log(error);
        }
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

    const deleteTask = async (id) => {
        try {
            showLoading()

            const res = await axios.delete(`${deleteTask_api}/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`

                }
            });

            const newTask = tasks.filter((item) => item._id !== id)

            dispatch(tasksReducer(newTask))


        } catch (error) {
            console.log(error);
            if (error.response) {
                const { status, data } = error.response;

                if (status >= 500) {
                    showSnackbar(data.message, 'error');
                    return
                }

                showSnackbar(data.message, 'warning');

            } else {
                showSnackbar('An unexpected error occurred', 'error');
            }
        } finally {
            hideLoading()
        }
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
                    key={task._id}
                    className="p-4 mb-4 rounded-lg shadow-lg bg-blue-200"
                    onDragStart={(e) => handleDragStart(e, task._id)}
                    onDragEnd={handleDragLeave}
                    draggable={true}
                >
                    <h3 className="text-lg font-semibold">Task : {task.task}</h3>
                    <p>Description : {task.description}</p>
                    <p className="text-sm text-gray-600">Created at: {task.createdAt}</p>
                    <p className="text-sm text-gray-600">Updated at: {task.updatedAt}</p>
                    <div className="flex justify-end gap-3 mt-2">
                        <button className="px-3 py-1 bg-red-500 text-white rounded" onClick={() => deleteTask(task._id)}>Delete</button>
                        <button className="px-5 py-1 bg-yellow-500 text-white rounded" onClick={() => {
                            setData(task)
                            setOpen(true);

                        }}>Edit</button>

                    </div>
                </div>
            ))}
            <EditTaskModal open={open} onClose={handleClose} data={data} setData={setData} />
            <SnackbarComponent />
            <LoadingModalComponent />
        </div>
    );
};

export default ListCard;
