import API from "../lib/axios";
import { formatError } from "./vallidate";
import { FormData } from "../types";

export async function login(url: string, formData: FormData) {
    try {
        const response = await API.post(url, formData);
        return response;
    } catch (error) {
        throw formatError(error);
    }
}

export async function register(url: string, formData: FormData) {
    try {
        const response = await API.post(url, formData);
        return response;
    } catch (error) {
        throw formatError(error);
    }
}