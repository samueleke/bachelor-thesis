import { Role } from "./utils/types";

export { }

declare global {
    namespace Express {
        export interface Request {
            user?: {
                id: string;
                email: string;
                role: Role;
            }
        }
    }
}