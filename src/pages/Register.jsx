import React from 'react';
import { TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
// import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// Define validation schema
const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
});

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            console.log(values);
            // try {
            //     setLoading(true);
            //     const response = await axios.post(`${process.env.REACT_APP_API_URL}/register`, values);

            //     if (response.data.statusCode === 201) {
            //         toast.success(response.data.message);
            //         navigate('/login');  // Navigate to login or another page after successful registration
            //     } else if (response.data.statusCode === 401) {
            //         toast.warn(response.data.message);
            //     }
            // } catch (error) {
            //     console.error('Error during registration:', error);
            //     toast.error('Something went wrong. Please try again.');
            // } finally {
            //     setLoading(false);
            // }
        }
    });

    return (
        <div className="flex items-center justify-center pt-20">
            <div>
                <h2 className="text-2xl font-bold mb-3 text-blue-600">Signup</h2>
                <div className="bg-white p-8 rounded-lg shadow-md w-96 border border-blue-600">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-4">
                            <TextField
                                name="firstName"
                                label="First Name"
                                // variant="outlined"
                                size="small"
                                fullWidth
                                required
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.firstName}
                                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                helperText={formik.touched.firstName && formik.errors.firstName}
                            />
                        </div>
                        <div className="mb-4">
                            <TextField
                                name="lastName"
                                label="Last Name"
                                variant="outlined"
                                size="small"
                                fullWidth
                                required
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.lastName}
                                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                helperText={formik.touched.lastName && formik.errors.lastName}
                            />
                        </div>
                        <div className="mb-4">
                            <TextField
                                name="email"
                                label="Email"
                                variant="outlined"
                                size="small"
                                type="email"
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
                                variant="outlined"
                                size="small"
                                type="password"
                                fullWidth
                                required
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                        </div>
                        <div className="mb-4">
                            <TextField
                                name="confirmPassword"
                                label="Confirm Password"
                                variant="outlined"
                                size="small"
                                type="password"
                                fullWidth
                                required
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.confirmPassword}
                                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                            />
                        </div>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={loading}
                        >
                            {loading ? 'Signing Up...' : 'Signup'}
                        </Button>
                    </form>
                    <div className="mt-4 text-center">
                        <p className="text-gray-600">Already have an account? <a href="/login" className="text-blue-600">Login</a></p>
                        <button
                            className="mt-4 w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-100 transition duration-200 flex items-center justify-center"
                        >
                            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5 mr-2" />
                            Signup with Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
