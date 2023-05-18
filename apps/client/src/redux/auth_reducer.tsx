import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types';
import { APIErrorType } from 'shared/errors';
type AuthState = {
    authData: User | null;
    error: APIErrorType | null;
};

const initialState: AuthState = {
    authData: null,
    error: null,
};

export const authReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        startAuth: (state, action: PayloadAction<User>) => {
            localStorage.setItem(
                'profile',
                JSON.stringify({ ...action.payload }),
            );
            return {
                ...state,
                authData: action?.payload,
                error: null,
            };
        },
        finishAuth: (state) => {
            localStorage.clear();
            return {
                ...state,
                authData: null,
                error: null,
            };
        },
        setError: (state, action: PayloadAction<APIErrorType>) => {
            return {
                ...state,
                error: action.payload,
            };
        },
    },
});

export const { startAuth, finishAuth, setError } = authReducer.actions;

export default authReducer.reducer;
export type AuthAction =
    | ReturnType<typeof startAuth>
    | ReturnType<typeof finishAuth>
    | ReturnType<typeof setError>;
