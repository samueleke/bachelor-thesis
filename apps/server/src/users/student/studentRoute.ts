import { signUp } from "../../middlewares/signUp";
import { Route } from "../../utils/types";
import { registerBody } from "./studentSchema";
import * as studentController from "./studentController";

const registerStudent: Route = {
    route: '/register',
    method: 'POST',
    body: registerBody,
    middleware: [signUp()],
    controller: studentController.registerStudent,
};

export const studentRoutes = () => {
    return [registerStudent];
}