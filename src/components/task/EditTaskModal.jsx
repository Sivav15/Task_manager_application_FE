import React, { useEffect } from 'react';
import { Dialog, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createTask_api, updateTask_api } from '../../services/api';
import useSnackbar from '../../hooks/useSnackbar';
import useLoadingModal from '../../hooks/useLoadingModal';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { tasksReducer } from '../../features/tasksSlice';

// Validation schema
const validationSchema = Yup.object({
    task: Yup.string().required('Task is required'),
    description: Yup.string().required('Description is required'),
});

const EditTaskModal = ({ open, onClose, data, setData }) => {

    const { showSnackbar, SnackbarComponent } = useSnackbar();
    const { showLoading, hideLoading, LoadingModalComponent } = useLoadingModal();
    const { token, id } = useSelector((state) => state.auth.auth);
    const dispatch = useDispatch()
    const tasks = useSelector((state) => state.tasks.tasks);
    // Formik setup
    const formik = useFormik({
        initialValues: {
            task: '',
            description: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                console.log(data);
                console.log(values);
                values.status = data.status
                // values.id = data._id
                showLoading()


                const res = await axios.put(`${updateTask_api}/${data._id}`, values, {
                    headers: {
                        'Authorization': `Bearer ${token}`

                    }
                });

                const newTask = tasks.map((item) => {
                    if (item._id === res.data.task._id) {
                        return { ...res.data.task }
                    }
                    return item
                })
                dispatch(tasksReducer(newTask))


                setData('')

                formik.resetForm()
                onClose()

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

        },
    });


    useEffect(() => {
        if (data) {
            formik.setValues({
                task: data.task,
                description: data.description,
            });
        }
    }, [data]);
    return (
        <Dialog open={open} onClose={onClose}>
            <div className="flex flex-col p-6 bg-white rounded-lg shadow-lg w-full max-w-md mx-auto">
                <p className="text-lg font-semibold mb-4">Edit Task</p>
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <TextField


                        label="Task"
                        type="text"
                        fullWidth
                        name="task"
                        value={formik.values.task}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.task && Boolean(formik.errors.task)}
                        helperText={formik.touched.task && formik.errors.task}
                        className="rounded-md"
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        type="text"
                        fullWidth
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                        className="rounded-md"
                    />
                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            type="button"
                            onClick={() => {
                                formik.resetForm()
                                onClose()
                            }}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-500 text-white rounded-md outline-none"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
            <SnackbarComponent />
            <LoadingModalComponent />
        </Dialog>
    );
};

export default EditTaskModal;
