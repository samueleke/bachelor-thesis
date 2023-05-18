import React, { useEffect, useState } from 'react';
import { useFetchQuestion } from '../hooks/FetchQuestions';
import { useDispatch, useSelector } from 'react-redux';
import { updateResult } from '../hooks/setResult';
import { RootState } from '../redux/store';
import { Question, QuestionProps } from '../types';
import Notification from './Error/Notification';
import { updateResultAction } from '../redux/result_reducer';

export default function Questions({ onChecked }: QuestionProps) {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [checked, setChecked] = useState<undefined | React.Key | null>(
        undefined,
    );
    const { trace } = useSelector((state: RootState) => state.questions);
    const result = useSelector((state: RootState) => state.result.result);
    const [{ isLoading, apiData, serverError }] = useFetchQuestion();

    const questions: Question = useSelector(
        (state: RootState) => state.questions.queue[state.questions.trace],
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateResultAction({ trace, checked: false }));
    }, [checked, dispatch, trace]);

    function onSelect(i: React.SetStateAction<React.Key | undefined | null>) {
        if (i !== null && i !== undefined) {
            onChecked(i);
            setChecked(i);
            dispatch(updateResultAction({ trace, checked: false }));
        }else{
            setErrorMessage('Please select an option');
        }
    }

    if (isLoading) {
        return <h3 className="text-light">Loading...</h3>;
    }

    if (serverError) {
        return (
            <h3 className="text-light">
                {serverError.toString() || 'Unknown error'}
            </h3>
        );
    }
    return (
        <div className="questions">
            {errorMessage && (<Notification message={errorMessage} type='error' onClose={()=> setErrorMessage(null)}/>)}
            <h2 className="text-light">{questions?.question}</h2>
            <ul key={questions?.id}>
                {questions?.options.map(
                    (q: string, i: React.Key | null | undefined) => (
                        <li key={i}>
                            <input
                                type="radio"
                                value={'false'}
                                name="question"
                                id={`q${i}-option`}
                                onChange={() => onSelect(i)}
                            />
                            <label
                                className="text-primary"
                                htmlFor={`q${i}-option`}
                            >
                                {q}
                            </label>
                            <div
                                className={`check ${
                                    result[trace] === i ? 'checked' : ''
                                }`}
                            ></div>
                        </li>
                    ),
                )}
            </ul>
        </div>
    );
}
