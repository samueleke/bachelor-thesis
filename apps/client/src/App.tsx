import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Main from './pages/Main/Main';
import Quiz from './components/Quiz';
import Result from './components/Result';
import Login from './pages/Login/Login';
import Signup from './pages/Register/Register';
import RootLayout from './pages/RootLayout';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ProtectedRoute } from './components/ProtectedRoute';

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            { path: '/', element: <Main /> },
            { path: '/signin', element: <Login /> },
            { path: '/signup', element: <Signup /> },
            {
                path: '/quiz',
                element: (
                    <ProtectedRoute>
                        <Quiz />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/result',
                element: (
                    <ProtectedRoute>
                        <Result />
                    </ProtectedRoute>
                ),
            },
        ],
    },
]);

function App() {
    return (
        <GoogleOAuthProvider
            clientId={import.meta.env.VITE_PUBLIC_GOOGLE_API_TOKEN}
        >
            <RouterProvider router={router} />
        </GoogleOAuthProvider>
    );
}

export default App;
