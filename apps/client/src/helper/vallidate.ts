import { APIError, APIErrorType } from "shared/errors";

export const isAPIError = (error: unknown): error is APIError => {
    return (error as APIError)?.data?.message !== undefined;
};

export function formatError(error: unknown): Error {
    const err = error as APIErrorType;
    const errorMessage = isAPIError(err)
        ? JSON.stringify(err.message)
        : JSON.stringify(error);
    return new Error(errorMessage);
}