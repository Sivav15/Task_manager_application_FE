import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { googleLogin_api } from '../services/api';
import useSnackbar from '../hooks/useSnackbar';
import { useNavigate } from 'react-router-dom';
import { authReducer } from '../features/authSlice';
import { useDispatch } from 'react-redux';

const GoogleLoginButton = () => {
    const { showSnackbar, SnackbarComponent } = useSnackbar();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const { data } = await axios.post(googleLogin_api, {
                    token: tokenResponse.access_token,
                });
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


            }




        },
        onError: (errorResponse) => showSnackbar(errorResponse, 'error'),
    });
    return (
        <>
            <button
                onClick={login}
                className="mt-4 w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-100 transition duration-200 flex items-center justify-center"
            >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5 mr-2" />
                Login with Google
            </button>
            <SnackbarComponent />
        </>
    );
};

export default GoogleLoginButton;
