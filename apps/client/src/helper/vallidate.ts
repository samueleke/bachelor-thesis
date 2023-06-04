import { APIError, APIErrorType } from "shared/errors";

export const isAPIError = (error: unknown): error is APIError => {
    return (error as APIError)?.data?.message !== undefined;
};
interface GenericErrorType {
    response?: {
        data?: {
            message?: string;
        };
    };
}

export function formatError(error: unknown): Error {
    const err = error as APIErrorType;
    let apiErrorMessage;
    if (isAPIError(err)) {
        apiErrorMessage = JSON.stringify(err.data?.message)
    }

    const genericError = error as GenericErrorType;
    const genericErrorMessage = genericError?.response?.data?.message;

    // If apiErrorMessage is defined, use that. If not, use genericErrorMessage
    const errorMessage = JSON.stringify(apiErrorMessage || genericErrorMessage);


    return new Error(errorMessage);
}