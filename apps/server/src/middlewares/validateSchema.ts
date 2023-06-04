import { NextFunction, Response } from 'express';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { APIError } from '../../../../packages/shared/errors';
import { z } from 'zod';
import { IRequest } from '../utils/types';

export const validateSchema =
    (schema: z.ZodObject<any, any> | z.ZodEffects<any,any>) =>
        (req: IRequest, res: Response, next: NextFunction) => {
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
