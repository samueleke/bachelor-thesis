import { NextFunction, Request, Response } from "express";
import { Role } from "../utils/types";
// eslint-disable-next-line @nx/enforce-module-boundaries
import {APIError} from "../../../../packages/shared/errors";

export const roleMiddleware = (...roles: Role[]) =>
    (req: Request, res: Response, next: NextFunction) => {
        const hasRole = req.user?.role && roles.includes(req.user?.role);
        if (!hasRole) {
            throw new APIError(401, { message: "Unauthorized! Incorrect role!" });
        }
        // Authorization successful
        next();
    };
