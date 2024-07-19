import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
// import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { login_api } from '../services/api';
import useSnackbar from '../hooks/useSnackbar';
import useLoadingModal from '../hooks/useLoadingModal';
import GoogleLoginButton from '../components/GoogleLoginButton';
import { useDispatch } from 'react-redux';
import { authReducer } from '../features/authSlice';

// Define validation schema
const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

const Login = () => {

    const { showSnackbar, SnackbarComponent } = useSnackbar();
    const { showLoading, hideLoading, LoadingModalComponent } = useLoadingModal();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                showLoading()
                const { data } = await axios.post(login_api, values);
                showSnackbar(data.message, 'success');
                dispatch(authReducer(data));
                navigate('/task');
            } catch (error) {
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
    });

    const registerNavigation = () => {
        navigate('/register');
    }

    return (
        <>
            <div className="flex items-center justify-center pt-20">
                <div>
                    <h2 className="text-2xl font-bold mb-3 text-blue-600">Login</h2>
                    <div className="bg-white p-8 rounded-lg shadow-md w-96 border border-blue-600">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="mb-4">
                                <TextField
                                    name="email"
                                    label="Email"
                                    size="small"
                                    type="email"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                            </div>
                            <div className="mb-4">
                                <TextField
                                    name="password"
                                    label="Password"
                                    size="small"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                />
                            </div>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                disabled={formik.isSubmitting}
                            >
                                Login
                            </Button>
                        </form>
                        <div className="mt-4 text-center">
                            <p className="text-gray-600">Don't have an account? <span onClick={registerNavigation} className="text-blue-600 cursor-pointer">Signup</span></p>
                            <GoogleLoginButton />
                        </div>
                    </div>
                </div>

            </div>
            <SnackbarComponent />
            <LoadingModalComponent />
        </>
    );
}

export default Login;
