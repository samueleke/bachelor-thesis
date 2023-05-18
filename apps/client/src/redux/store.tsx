import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './auth_reducer'
import { useDispatch as useReduxDispatch } from 'react-redux'

import questionReducer from './question_reducer'
import resultReducer from './result_reducer'

const rootReducer = combineReducers({
    questions: questionReducer,
    result: resultReducer,
    auth: authReducer,
})

export const store =  configureStore({
    reducer: rootReducer
})

export const useDispatch = () => useReduxDispatch<AppDispatch>()
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch