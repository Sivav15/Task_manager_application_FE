import React from 'react';
import { useSelector } from 'react-redux';
import { redirect } from 'react-router-dom';

const AuthProtectedRoute = ({ children }) => {
    const { token } = useSelector((state) => state.auth.auth);
    console.log(token);
    if (!token) {
        return <div>Not found</div>;
    }

    return children;
}

export default AuthProtectedRoute;
