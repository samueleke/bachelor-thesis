import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getServerData } from '../helper/helper';
import { Dispatch } from 'redux';

import * as Action from '../redux/question_reducer';
import {
    FetchQuestionState,
    ServerResponse,
    SetFetchQuestionState,
} from '../types';

export const useFetchQuestion = (): [
    FetchQuestionState,
    SetFetchQuestionState,
] => {
    const dispatch = useDispatch<Dispatch<Action.QuestionAction>>();
    const [getData, setGetData] = useState<FetchQuestionState>({
        isLoading: false,
        apiData: { questions: [], answers: [] },
        serverError: null,
    });

    useEffect(() => {
        setGetData((prev) => ({ ...prev, isLoading: true }));

        (async () => {
            try {
                const response = await getServerData<ServerResponse>(
                    `${import.meta.env.VITE_SERVER_HOSTNAME}/api/questions`,
                    (data) => data,
                );

                if (!response) {
                    throw new Error('No response from server');
                }
                const { data } = response;
                const questions = data.questions;
                const answers = data.answers;

                if (questions.length > 0) {
                    setGetData((prev) => ({ ...prev, isLoading: false }));
                    setGetData((prev) => ({
                        ...prev,
                        apiData: { questions, answers },
                    }));

                    dispatch(
                        Action.startExamAction({
                            question: questions,
                            answers,
                        }),
                    );
                } else {
                    throw new Error('No question available');
                }
            } catch (error) {
                const serverError = error as Error;
                setGetData((prev) => ({ ...prev, isLoading: false }));
                setGetData((prev) => ({ ...prev, serverError }));
            }
        })();
    }, [dispatch]);

    return [getData, setGetData];
};

export const MoveNextQuestion =
    () => async (dispatch: Dispatch<Action.QuestionAction>) => {
        try {
            dispatch(Action.moveNextAction());
        } catch (error) {
            console.log(error);
        }
    };

export const MovePrevQuestion =
    () => async (dispatch: Dispatch<Action.QuestionAction>) => {
        try {
            dispatch(Action.movePrevAction());
        } catch (error) {
            console.log(error);
        }
    };
