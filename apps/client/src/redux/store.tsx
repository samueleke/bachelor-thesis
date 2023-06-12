import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/auth_reducer';
import { useDispatch as useReduxDispatch } from 'react-redux';

import questionReducer from './question/question_reducer';
import resultReducer from './result/result_reducer';

const rootReducer = combineReducers({
    questions: questionReducer,
    result: resultReducer,
    auth: authReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: true,
        }),
});

export const useDispatch = () => useReduxDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
