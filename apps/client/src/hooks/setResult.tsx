import { postServerData } from '../helper/helper';
import * as Action from '../redux/result_reducer';
import * as API from '../helper/helper';
import * as Auth from '../redux/auth_reducer';
import { FormData, PublishResultParams } from '../types';
import { APIErrorType } from 'shared/errors';
import { Dispatch } from '@reduxjs/toolkit';

export const pushAnswer =
    (result: Action.ResultAction) =>
    async (dispatch: Dispatch<Action.ResultAction>) => {
        try {
            await dispatch(Action.pushResultAction(result));
        } catch (error) {
            console.log(error);
        }
    };

export const updateResult =
    (index: { trace: number; checked: boolean }) =>
    async (dispatch: Dispatch<Action.ResultAction>) => {
        try {
            dispatch(Action.updateResultAction(index));
        } catch (error) {
            console.log(error);
        }
    };

export const usePublishResult = (resultData: PublishResultParams) => {
    const { result, username } = resultData;
    (async () => {
        try {
            if (result.length === 0 && !username)
                throw new Error("Couldn't get result.");
            await postServerData(
                `${import.meta.env.VITE_SERVER_HOSTNAME}/api/result`,
                resultData,
                (data) => data,
            );
        } catch (error) {
            console.log(error);
        }
    })();
};

export const signIn =
    (formData: FormData, navigate: (path: string) => void) =>
    async (dispatch: Dispatch<Auth.AuthAction>) => {
        try {
            //log in user & navigate to home page
            const { data } = await API.signIN(
                `${import.meta.env.VITE_SERVER_HOSTNAME}/login`,
                formData,
            );
            dispatch(Auth.startAuth(data));

            navigate('/');
        } catch (error: any) {
            console.log(error);

            const err = error as Error;

            // // console.log(err.message);
            dispatch(Auth.setError(err.message));
        }
    };
export const signUp =
    (formData: FormData, navigate: (path: string) => void) =>
    async (dispatch: Dispatch<Auth.AuthAction>) => {
        try {
            //sign up user
            const { data } = await API.signUP(
                `${import.meta.env.VITE_SERVER_HOSTNAME}/signup`,
                formData,
            );
            dispatch(Auth.startAuth(data));
            navigate('/');
        } catch (error) {
            console.log(error);

            const err = error as Error;
            dispatch(Auth.setError(err.message));
        }
    };
