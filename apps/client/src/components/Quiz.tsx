import React, { useState } from 'react';
import Questions from './Questions';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Dispatch } from 'redux';
import { RootState } from '../redux/store';
import { pushResultAction } from '../redux/result/result_reducer';
import { MoveNextQuestion, MovePrevQuestion } from '../redux/question/handleQuestion';
import { pushAnswer } from '../redux/result/handleResult';

export default function Quiz() {
    const [check, setChecked] = useState<React.Key | undefined | null>(
        undefined,
    );

    const result = useSelector((state: RootState) => state.result.result);
    const { queue, trace } = useSelector((state: RootState) => state.questions);
    const dispatch = useDispatch<Dispatch<any>>();

    function onNext() {
        if (trace < queue.length) {
            dispatch(MoveNextQuestion());

            //insert new result in the array
            if (result.length <= trace) {
                if (check !== undefined && check !== null) {
                    dispatch(pushAnswer(pushResultAction(check)));
                }
            }
        }

        setChecked(undefined);
    }

    function onPrevious() {
        if (trace > 0) {
            dispatch(MovePrevQuestion());
        }
    }

    function onChecked(
        check: React.SetStateAction<React.Key | null | undefined>,
    ) {
        setChecked(check);
    }

    if (result.length && result.length >= queue.length) {
        return <Navigate to={'/result'} replace={true} />;
    }

    return (
        <div className="container">
            <h1 className="tittle text-light">Quiz Application</h1>

            <Questions onChecked={onChecked} />

            <div className="grid">
                {trace > 0 ? (
                    <button className="btn prev" onClick={onPrevious}>
                        Previous
                    </button>
                ) : (
                    <div></div>
                )}
                <button className="btn next" onClick={onNext}>
                    Next
                </button>
            </div>
        </div>
    );
}
