import API from "../lib/axios";
import { AxiosResponse } from "axios";
import { CallbackFunction, PublishResultParams } from "../types";

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

export const publishResult = (resultData: PublishResultParams) => {
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
