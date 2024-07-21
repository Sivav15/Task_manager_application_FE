import React, { useEffect } from 'react';
import './App.css';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import HomeLayout from './layouts/HomeLayout';
import Task from './pages/Task';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthProtectedRoute from './protected route/AuthProtectedRoute';
import NotFound from './components/NotFound';


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
            <AuthProtectedRoute>
              <Task />
            </AuthProtectedRoute>
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
        // {
        //   path: "*",
        //   element: <NotFound />,
        // },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App