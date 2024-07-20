import React from 'react';
import './App.css';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import HomeLayout from './layouts/HomeLayout';
import Task from './pages/Task';
import Login from './pages/Login';
import Register from './pages/Register';
import { useSelector } from 'react-redux';
import AuthProtectedRoute from './protected route/AuthProtectedRoute';


const App = () => {


  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        // {
        //   path: "/",
        //   element: <Navigate to="/task" replace />,
        // },
        {
          path: "task",
          element:
            // <AuthProtectedRoute> 
            <Task />
          // </AuthProtectedRoute>
          ,
        },
        {
          path: "/",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App