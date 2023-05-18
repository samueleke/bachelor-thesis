const errorStatusCodes = {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    405: 'Method Not Allowed',
    409: 'Conflict',
    500: 'Internal Server Error',
    501: 'Not Implemented',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Gateway Timeout',
    511: 'Network Authentication Required',
} as const;

export class APIError extends Error {
    errorCode: keyof typeof errorStatusCodes;
    data?: Record<string, unknown>;

    constructor(
        errorCode: keyof typeof errorStatusCodes,
        data?: Record<string, unknown>) {
        const message = errorStatusCodes[errorCode];
        super(message);
        this.errorCode = errorCode;
        this.data = data;
    }
}

export type APIErrorType = {
    errorCode: typeof errorStatusCodes;
    data?: Record<string, unknown>;
};