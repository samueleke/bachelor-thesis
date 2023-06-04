import { registerTeacherBody } from "./adminSchema";
import * as adminController from "./adminController";
import { Route } from "../../utils/types";

const registerTeacher: Route = {
    route: '/register-teacher',
    method: 'POST',
    auth: true,
    role: 'admin',
    body: registerTeacherBody,
    middleware: [],
    controller: adminController.registerTeacher,
}

export const adminRoutes = () => {
    return [registerTeacher]
}