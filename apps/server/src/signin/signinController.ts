import { IRequest } from "../utils/types";
import env from "../utils/env";
import jwt from "jsonwebtoken";
// eslint-disable-next-line @nx/enforce-module-boundaries
import { APIError } from "../../../../packages/shared/errors";

export async function loginUser(req: IRequest) {
    const body = { id: req.user?.id, role: req.user?.role };

    if (!body.id || !body.role) throw new APIError(400, { msg: "req.user missing" })
    const token = jwt.sign({ user: body }, env.JWT_SECRET);
    return { token: `Bearer ${token}` };
}