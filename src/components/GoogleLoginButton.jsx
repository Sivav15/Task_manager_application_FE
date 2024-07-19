import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const GoogleLoginButton = () => {
    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                console.log(tokenResponse);
                const res = await axios.post('http://localhost:5000/api/auth/google/callback', {
                    token: tokenResponse.access_token,
                });

                console.log(res);
                // localStorage.setItem('token', res.data.token);
                // // Handle successful login
            } catch (err) {
                console.error(err);
            }
        },
        onError: (errorResponse) => console.error(errorResponse),
    });

    return (
        <button onClick={() => login()}>Login with Google</button>
    );
};

export default GoogleLoginButton;
