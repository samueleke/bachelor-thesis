import { Dispatch } from 'redux';
import * as QuestionAction from './question_reducer';

export const MoveNextQuestion =
    () => async (dispatch: Dispatch<QuestionAction.QuestionAction>) => {
        try {
            dispatch(QuestionAction.moveNextAction());
        } catch (error) {
            console.log(error);
        }
    };

export const MovePrevQuestion =
    () => async (dispatch: Dispatch<QuestionAction.QuestionAction>) => {
        try {
            dispatch(QuestionAction.movePrevAction());
        } catch (error) {
            console.log(error);
        }
    };