import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import { comparePassword } from "../utils/hashPassword";
import { getUserByEmail } from "../userProvider";

passport.use(
    "login",
    new LocalStrategy(
        { usernameField: "email", passwordField: "password" },
        async (email, password, done) => {
            try {
                const user = await getUserByEmail(email);
                if (!user) {
                    return done(null, false, { message: "User not found" });
                }
                const validate = await comparePassword(password, user.password);
                if (!validate) {
                    return done(null, false, { message: "Wrong password" });
                }
                return done(null, user, { message: "Logged in successfully" });
            } catch (error) {
                return done(error);
            }
        }
    )
);

export const login = () => {
    return passport.authenticate("login", { session: false });
};
