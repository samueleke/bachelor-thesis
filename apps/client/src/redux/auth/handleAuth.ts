import { Dispatch } from "@reduxjs/toolkit";
import * as AuthAction  from "./auth_reducer";
import { FormData } from "../../types";
import { isAPIErrorType } from "../../utils/vallidate";
import { login, register } from "../../utils/auth";


export const registerUser =
    (formData: FormData, navigate: (path: string) => void) =>
        async (dispatch: Dispatch<AuthAction.AuthAction>) => {
            try {
                //sign up user
                const { data } = await register(
                    `${import.meta.env.VITE_SERVER_HOSTNAME}/register`,
                    formData,
                );
                dispatch(AuthAction.startAuth(data));
                navigate('/');
            } catch (error) {
                if (isAPIErrorType(error)) {
                    dispatch(AuthAction.setError(error.data));
                } else {
                    dispatch(AuthAction.setError(error?.toString()));
                }
            }
        };



export const loginUser =
    (formData: FormData, navigate: (path: string) => void) =>
        async (dispatch: Dispatch<AuthAction.AuthAction>) => {
            // Clear any previous error
            dispatch(AuthAction.setError(null));
            try {
                //log in user & navigate to home page

                const { data } = await login(
                    `${import.meta.env.VITE_SERVER_HOSTNAME}/login`,
                    formData,
                );
                dispatch(AuthAction.startAuth(data));

                navigate('/');
            } catch (error) {
                if (isAPIErrorType(error)) {
                    dispatch(AuthAction.setError(error.data));
                } else {
                    dispatch(AuthAction.setError(error?.toString()));
                }
            }
        };