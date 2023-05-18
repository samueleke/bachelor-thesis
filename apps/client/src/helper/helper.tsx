import axios, { AxiosResponse } from 'axios';
import { CallbackFunction, PublishResultParams, FormData } from '../types';
import { ResultState } from '../redux/result_reducer';
import { formatError } from './vallidate';

const API = axios.create();
API.interceptors.request.use((req) => {
    const profile = localStorage.getItem('profile');
    if (profile) {
        req.headers.authorization = `Bearer ${JSON.parse(profile).token}`;
    }
    return req;
});

export function attempts_number(result: ResultState[]): number {
    return result.filter((r) => r !== undefined).length;
}

export function earnPoints_number(
    result: any[],
    answers: { [x: string]: any },
    point: number,
) {
    return result
        .map((element, i) => answers[i] === element)
        .filter((i) => i)
        .map((i) => point)
        .reduce((prev, current) => prev + current, 0);
}

export function flagResult(totalPoints: number, earnPoints: number) {
    return (totalPoints * 50) / 100 < earnPoints;
}



export async function getServerData<T>(
    url: string,
    callback?: CallbackFunction<T>,
): Promise<T | undefined> {
    const response: AxiosResponse<T> = await API.get(url);
    const data: T | undefined = response?.data;
    if (callback) {
        callback(data);
    }
    return data;
}

export async function postServerData<T>(
    url: string,
    result: PublishResultParams,
    callback: CallbackFunction<T>,
) {
    const data = await (await API.post(url, result))?.data;
    return callback ? callback(data) : data;
}

export async function signIN(url: string, formData: FormData) {
    try {
        const response = await API.post(url, formData);
        return response;
    } catch (error) {
        throw formatError(error);
    }
}

export async function signUP(url: string, formData: FormData) {
    try {
        const response = await API.post(url, formData);
        return response;
    } catch (error) {
        throw formatError(error);
    }
}
