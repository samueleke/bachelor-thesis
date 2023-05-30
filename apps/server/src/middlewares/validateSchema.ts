import { NextFunction, Request, Response } from 'express';
import { APIError } from 'shared/errors';
import { z } from 'zod';

export const validateSchema =
    (schema: z.ZodObject<any, any>) =>
        (req: Request, res: Response, next: NextFunction) => {
            let reqField = req.body;
            const parsedParams = schema.safeParse(reqField);

            if (parsedParams.success) {
                reqField = parsedParams.data;
                return next();
            }

            const error = parsedParams.error;

            if (error instanceof z.ZodError) {
                const missingFields = error.issues.map((err) => err.path.join('.'));
                if (missingFields.length === 0 || missingFields[0] === '') {
                    throw new APIError(400, { error: error.errors[0].message });
                }
                const message = Object.fromEntries(
                    error.issues.map((err) => [err.path.join('.'), err.message])
                );
                throw new APIError(400, { error: message });
            }
        };
