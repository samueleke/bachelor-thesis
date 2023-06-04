import { login } from "../middlewares/login";
import { Route } from "../utils/types";
import { loginUser } from "./signinController";
import { loginBody } from "./signinSchema";

const signinUser: Route = {
    route: "/login",
    method: "POST",
    body: loginBody,
    middleware: [login()],
    controller: loginUser
};

export const signinRoutes = () => {
    return [signinUser]
};