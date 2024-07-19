import React from 'react';
import { TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
// import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// Define validation schema
const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            console.log(values);
            // try {
            //     setLoading(true);
            //     const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, values);

            //     if (response.data.statusCode === 200) {
            //         localStorage.setItem('Token', response.data.token);
            //         toast.success('Login successful!');
            //         navigate('/dashboard'); // Redirect to a dashboard or main page
            //     } else {
            //         toast.warn(response.data.message);
            //     }
            // } catch (error) {
            //     console.error('Error during login:', error);
            //     toast.error('Something went wrong. Please try again.');
            // } finally {
            //     setLoading(false);
            // }
        }
    });

    return (
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
                            disabled={loading}
                        >
                            {loading ? 'Logging In...' : 'Login'}
                        </Button>
                    </form>
                    <div className="mt-4 text-center">
                        <p className="text-gray-600">Don't have an account? <a href="/register" className="text-blue-600">Signup</a></p>
                        <button
                            className="mt-4 w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-100 transition duration-200 flex items-center justify-center"
                        >
                            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5 mr-2" />
                            Login with Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
