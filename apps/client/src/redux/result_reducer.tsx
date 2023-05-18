import { createSlice } from '@reduxjs/toolkit';

export type ResultState = {
    userId: string | null;
    result: any[];
};

const initialState: ResultState = {
    userId: null,
    result: [],
};

export const resultReducer = createSlice({
    name: 'result',
    initialState,
    reducers: {
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
        pushResultAction: (state, action) => {
            state.result.push(action.payload);
        },
        updateResultAction: (state, action) => {
            const { trace, checked }: { trace: number; checked: boolean } =
                action.payload;
            state.result.fill(checked, trace + 1);
        },
        resetResultAction: () => {
            return {
                userId: null,
                result: [],
            };
        },
    },
});

export const {
    setUserId,
    pushResultAction,
    resetResultAction,
    updateResultAction,
} = resultReducer.actions;

export default resultReducer.reducer;

export type ResultAction =
    | ReturnType<typeof setUserId>
    | ReturnType<typeof pushResultAction>
    | ReturnType<typeof resetResultAction>
    | ReturnType<typeof updateResultAction>;
