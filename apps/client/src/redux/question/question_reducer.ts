import { createSlice } from '@reduxjs/toolkit';
import { Answer, Question } from '../../types';

type QuestionState = {
    queue: Question[];
    answers: Answer[];
    trace: number;
};

const initialState: QuestionState = {
    queue: [],
    answers: [],
    trace: 0,
};

export const questionReducer = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        startExamAction: (state, action) => {
            const { question, answers } = action.payload;
            return {
                ...state,
                queue: question,
                answers,
            };
        },
        moveNextAction: (state) => {
            return {
                ...state,
                trace: state.trace + 1,
            };
        },
        movePrevAction: (state) => {
            return {
                ...state,
                trace: state.trace - 1,
            };
        },
        resetAllAction: () => {
            return {
                queue: [],
                answers: [],
                trace: 0,
            };
        },
    },
});

export const {
    startExamAction,
    moveNextAction,
    movePrevAction,
    resetAllAction,
} = questionReducer.actions;

export default questionReducer.reducer;
export type QuestionAction =
    | ReturnType<typeof startExamAction>
    | ReturnType<typeof moveNextAction>
    | ReturnType<typeof movePrevAction>
    | ReturnType<typeof resetAllAction>;
