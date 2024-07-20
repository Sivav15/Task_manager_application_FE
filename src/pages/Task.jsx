// src/components/Task.jsx
import React, { useEffect, useState } from 'react';
import Header from '../components/task/Header';
import ListCard from '../components/task/ListCard';
import useSnackbar from '../hooks/useSnackbar';
import useLoadingModal from '../hooks/useLoadingModal';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { viewTask_api } from '../services/api';
import { tasksReducer } from '../features/tasksSlice';



const Task = () => {

    const { showSnackbar, SnackbarComponent } = useSnackbar();
    const { showLoading, hideLoading, LoadingModalComponent } = useLoadingModal();
    const { token, id } = useSelector((state) => state.auth.auth);

    const tasks = useSelector((state) => state.tasks.tasks);
    const dispatch = useDispatch()

    const viewTaskRequest = async () => {
        try {
            showLoading()

            const { data } = await axios.get(`${viewTask_api}/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`

                }
            });

            dispatch(tasksReducer(data))

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

    useEffect(() => {
        if (token) {
            viewTaskRequest()
        }
    }, [token])

    return (
        <div className="p-4 w-full xl:w-[85%]">
            <Header />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2" >
                {tasks.length > 0 && ['todo', 'inProgress', 'done'].map((status, index) => (
                    <ListCard tasks={tasks} status={status} key={index} />
                ))}
            </div>
            <SnackbarComponent />
            <LoadingModalComponent />
        </div>
    );
};

export default Task;
