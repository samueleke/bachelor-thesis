import { Admin } from "../users/admin/adminModel";
import { Student } from "../users/student/studentModel";
import { Teacher } from "../users/teacher/teacherModel";
import mongoose from "mongoose";
import { RegisterDTO } from "../utils/types";

export const createUser = async <T>(userModel: RegisterDTO, model: mongoose.Model<T>) => {
    const {
        firstName,
        lastName,
        email,
        password
    } = userModel;

    return await model.create({
        firstName,
        lastName,
        email,
        password
    });
};



export async function getUserByEmail(email: string) {
    const teacher = await Teacher.findOne({ email: email });
    if (teacher) {
        return teacher;
    }
    const student = await Student.findOne({ email: email });
    if (student) {
        return student;
    }
    const admin = await Admin.findOne({ email: email });
    if (admin) {
        return admin;
    }
}