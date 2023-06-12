// eslint-disable-next-line @nx/enforce-module-boundaries
import { APIError } from "../../../../../packages/shared/errors";
import { createUser } from "../userProvider";
import { IRequest, RegisterDTO } from "../../utils/types";
import { Student } from "./studentModel";
import jwt from "jsonwebtoken";
import env from "../../utils/env";


export const registerStudent = async (req: IRequest<RegisterDTO>) => {

    try {
        const userModel = {
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        };
        console.log(userModel);

        const newUser = await createUser(userModel, Student);

        if (!newUser) {
            throw new APIError(500, { message: `Error when creating new student: ${newUser}` });
        }

        const body = { id: newUser.id, role: newUser.role }
        const token = jwt.sign({ user: body }, env.JWT_SECRET)

        return { token: `Bearer ${token}` };
    } catch (error) {
        console.error(error);
        if (error instanceof APIError) {
            throw error
        }
        else if (error instanceof Error) {
            throw new APIError(500, { message: `Unknown error when creating new student: ${error.message}` })
        }

    }
}