import { model, Schema, Types } from "mongoose";
import bcrypt from "bcrypt";

export type TStudent = {
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
};

const studentSchema = new Schema<TStudent>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // * unique: true ensures that no two users can have the same email
    password: { type: String, required: true },
    role: { type: String, default: "student" },
});

studentSchema.pre("save", async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

export const Student = model<TStudent>("Student", studentSchema, "users");