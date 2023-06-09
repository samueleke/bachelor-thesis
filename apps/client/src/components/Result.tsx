import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { attemptsNumber, earnedPoints, flagResult } from '../utils/helper';
import { resetAllAction } from '../redux/question/question_reducer';
import { resetResultAction } from '../redux/result/result_reducer';
import '../styles/Result.css';
import ResultTable from './ResultTable';
import { RootState } from '../redux/store';
import { publishResult } from '../utils/serverData';

export default function Result() {
    const dispatch = useDispatch();

    const {
        questions: { queue, answers },
        result: { userId, result },
    } = useSelector((state: RootState) => state);

    const totalPoints = queue.length * 10;
    const attempts = attemptsNumber(result);
    const earnPoints = earnedPoints(result, answers, 10);
    const flag = flagResult(totalPoints, earnPoints);

    publishResult({
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
