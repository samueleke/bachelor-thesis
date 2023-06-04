// eslint-disable-next-line @nx/enforce-module-boundaries
import { APIError } from "../../../../../packages/shared/errors";
import { IRequest, TeacherRegisterDTO } from "../../utils/types";
import { createUser } from "../userProvider";
import { Teacher } from "../teacher/teacherModel";


export const registerTeacher = async (req: IRequest<TeacherRegisterDTO>) => {
    try {
        const userModel = {
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        }

        const newUser = await createUser(userModel, Teacher);
        if (!newUser) {
            throw new APIError(500, { message: `Error when creating new teacher: ${newUser}` });
        }

        return { id: newUser.id }
    } catch (error) {
        console.error(error);
        if (error instanceof APIError) {
            throw error
        }
        else if (error instanceof Error) {
            throw new APIError(500, { message: `Unknown error when creating new teacher: ${error.message}` })
        }
    }
}
