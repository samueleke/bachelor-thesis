import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import { comparePassword } from "../utils/hashPassword";
// eslint-disable-next-line @nx/enforce-module-boundaries
import { APIError } from "../../../../packages/shared/errors";
import { getUserByEmail } from "../users/userProvider";

passport.use(
    "login",
    new LocalStrategy(
        { usernameField: "email", passwordField: "password" },
        async (email, password, done) => {
            try {
                const user = await getUserByEmail(email);
                if (!user) {
                    return done(
                        new APIError(404,
                            "User not found!"
                        ), false);
                }
                const validate = await comparePassword(password, user.password);
                if (!validate) {
                    return done(
                        new APIError(403,
                            "Wrong password!"
                        )
                        , false);
                }
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);

export const login = () => {
    return passport.authenticate("login", { session: false });
};
