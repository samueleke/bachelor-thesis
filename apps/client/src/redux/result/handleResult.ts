import * as ResultAction from './result_reducer';
import { Dispatch } from '@reduxjs/toolkit';

export const pushAnswer =
    (result: ResultAction.ResultAction) =>
        async (dispatch: Dispatch<ResultAction.ResultAction>) => {
            try {
                dispatch(ResultAction.pushResultAction(result));
            } catch (error) {
                console.log(error);
            }
        };

export const updateResult =
    (index: { trace: number; checked: boolean }) =>
        async (dispatch: Dispatch<ResultAction.ResultAction>) => {
            try {
                dispatch(ResultAction.updateResultAction(index));
            } catch (error) {
                console.log(error);
            }
        };
