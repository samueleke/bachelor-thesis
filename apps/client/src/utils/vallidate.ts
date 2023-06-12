import { APIErrorType } from "shared/errors";

export const isAPIErrorType = (error: any): error is APIErrorType => {
    return error.data && typeof error.errorCode !== undefined;
};
interface GenericErrorType {
    response?: {
        data?: {
            message?: string;
        };
    };
}

export function formatError(error: unknown): Error {
    let apiErrorMessage;
    if (isAPIErrorType(error)) {
        apiErrorMessage = JSON.stringify(error.data)
    }

    const genericError = error as GenericErrorType;
    const genericErrorMessage = genericError?.response?.data?.message;

    // If apiErrorMessage is defined, use that. If not, use genericErrorMessage
    const errorMessage = JSON.stringify(apiErrorMessage || genericErrorMessage);

    return new Error(errorMessage);
}