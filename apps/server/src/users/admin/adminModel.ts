import { model, Schema, Types } from "mongoose";
import bcrypt from "bcrypt";


export type TAdmin = {
    id: Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
};

const adminSchema = new Schema<TAdmin>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'admin', required: true },
});

adminSchema.pre<TAdmin>('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

export const Admin = model<TAdmin>('Admin', adminSchema, 'users');
