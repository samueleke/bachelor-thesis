import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { answers } from '../database/data';
import {
    attempts_number,
    earnPoints_number,
    flagResult,
} from '../helper/helper';
import { usePublishResult } from '../hooks/setResult';
import { resetAllAction } from '../redux/question_reducer';
import { resetResultAction } from '../redux/result_reducer';
import '../styles/Result.css';
import ResultTable from './ResultTable';
import { RootState } from '../redux/store';

export default function Result() {
    const dispatch = useDispatch();

    const {
        questions: { queue, answers },
        result: { userId, result },
    } = useSelector((state: RootState) => state);

    const totalPoints = queue.length * 10;
    const attempts = attempts_number(result);
    const earnPoints = earnPoints_number(result, answers, 10);
    const flag = flagResult(totalPoints, earnPoints);

    usePublishResult({
        result,
        username: userId,
        attempts,
        points: earnPoints,
        achieved: flag ? 'Passed' : 'Failed',
    });

    function onRestart() {
        dispatch(resetAllAction());
        dispatch(resetResultAction());
    }
    return (
        <div className="container">
            <h1 className="tittle text-light">Quiz Application</h1>

            <div className="result flex-center">
                <div className="flex">
                    <span>Username</span>
                    <span className="bold">Daily tuition</span>
                </div>
                <div className="flex">
                    <span>Total Quiz Points:</span>
                    <span className="bold">{totalPoints || 0}</span>
                </div>

                <div className="flex">
                    <span>Total Questions:</span>
                    <span className="bold">{queue.length || 0}</span>
                </div>

                <div className="flex">
                    <span>Total questions answered:</span>
                    <span className="bold">{attempts || 0}</span>
                </div>

                <div className="flex">
                    <span>Total Earned Points:</span>
                    <span className="bold">{earnPoints || 0}</span>
                </div>

                <div className="flex">
                    <span>Quiz Result:</span>
                    <span
                        style={{ color: `${flag ? '#2aff95' : 'ff2a66'}` }}
                        className="bold"
                    >
                        {flag ? 'Passed' : 'Failed'}
                    </span>
                </div>
            </div>

            <div className="start">
                <Link className="btn" to={'/'} onClick={onRestart}>
                    Restart
                </Link>
            </div>

            <div className="container">
                <ResultTable />
            </div>
        </div>
    );
}
