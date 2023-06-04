import { model, Schema, Types } from "mongoose";
import bcrypt from "bcryptjs";

export type TTeacher = {
    id: Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
};

const teacherSchema = new Schema<TTeacher>({
    firstName: {type: "string", required: true},
    lastName: {type: "string", required: true},
    email: {type: "string", required: true, unique: true},
    password: {type: "string", required: true},
    role: {type: "string", default: "teacher"},
});

teacherSchema.pre("save", async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

export const Teacher = model<TTeacher>("Teacher", teacherSchema, "users");