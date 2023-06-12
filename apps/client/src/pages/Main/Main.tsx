import React, { Fragment, useRef, FC } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { setUserId } from '../../redux/result/result_reducer';
import './Main.css';

import Navbar from '../../components/Navbar/Navbar';
import { Container } from '@mui/material';
import { Box } from '@mui/system';

const Main: FC = () => {
    const inputRef = useRef<HTMLInputElement>(null);

    const dispatch = useDispatch();

    function startQuiz() {
        if (inputRef.current?.value) {
            dispatch(setUserId(inputRef.current?.value));
        }
    }

    return (
        <Container maxWidth="xl">
            {/*

                <Box>test</Box>
                <Box component='img'
                    sx={{
                        height: 400,
                        width: 400
                    }}
                    src="../../pictures/vecteezy_illustration-vector-graphic-cartoon-character-of-home-study_6584582.jpg"
                >
                </Box> */}

            <ul className="description">
                <li>Quiz rules:</li>
                <li>Answer questions by chosing from avaible options.</li>
            </ul>

            <form id="form">
                <input
                    ref={inputRef}
                    className="userid"
                    type="text"
                    placeholder="Username*"
                ></input>
            </form>

            <div className="start">
                <Link className="btn" to={'quiz'} onClick={startQuiz}>
                    Start Quiz
                </Link>
            </div>
        </Container>
    );
};

export default Main;
