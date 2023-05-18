import React from 'react';
import '../styles/App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Main from './Main/Main';
import Quiz from './Quiz';
import Result from './Result';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import RootLayout from './RootLayout';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ProtectedRoute } from './ProtectedRoute';

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
