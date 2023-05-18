import React, { useEffect, useState, useCallback, FC } from 'react';
import { Avatar, Toolbar, Typography, Button } from '@mui/material';

import './Navbar.css';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import * as Action from '../../redux/auth_reducer';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { User } from '../../types';

const Navbar: FC = () => {
    const [user, setUser] = useState<User | null>(
        JSON.parse(localStorage.getItem('profile') || 'null'),
    );
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const logOut = useCallback(() => {
        dispatch(Action.finishAuth());
        navigate('/');
        setUser(null);
    }, [dispatch, navigate]);

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = jwtDecode<JwtPayload>(token);
            if (
                decodedToken.exp &&
                decodedToken.exp * 1000 < new Date().getTime()
            ) {
                logOut();
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile') || 'null'));
    }, [location, user?.token, logOut]);

    return (
        <div className="navbar_container">
            <nav className="navbar">
                <Link to={'/'} style={{ textDecoration: 'none' }}>
                    <Typography className="navbar-heading" variant="h4">
                        QuizMe
                    </Typography>
                </Link>

                <Toolbar
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                    }}
                >
                    {user ? (
                        <div className="profile">
                            <Avatar>{user.name?.charAt(0)}</Avatar>
                            <Button
                                className="btn signup"
                                sx={{
                                    borderRadius: '30px',
                                    fontSize: '1rem',
                                    color: '#A036F3',
                                    textTransform: 'none',
                                    px: 1,
                                }}
                                size="small"
                                variant="text"
                                onClick={() => {
                                    logOut();
                                }}
                            >
                                Log out
                            </Button>
                        </div>
                    ) : (
                        <ul>
                            <li>
                                <Link
                                    to={'/signin'}
                                    style={{ textDecoration: 'none' }}
                                >
                                    <Button
                                        sx={{
                                            borderRadius: '30px',
                                            fontSize: '1rem',
                                            color: '#A036F3',
                                            textTransform: 'none',
                                            px: 1,
                                        }}
                                        className="btn login"
                                    >
                                        Sign in
                                    </Button>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={'/signup'}
                                    style={{ textDecoration: 'none' }}
                                >
                                    <Button
                                        sx={{
                                            borderRadius: '30px',
                                            fontSize: '1rem',
                                            color: '#A036F3',
                                            textTransform: 'none',
                                            px: 1,
                                        }}
                                        className="btn signup"
                                    >
                                        Sign up
                                    </Button>
                                </Link>
                            </li>
                        </ul>
                    )}
                </Toolbar>
            </nav>
        </div>
    );
};

export default Navbar;
