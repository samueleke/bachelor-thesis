import { z } from 'zod';

const registerTeacherBodyBase = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    repeatPassword: z.string().min(6),
    firstName: z.string(),
    lastName: z.string(),
})

export const registerTeacherBody = registerTeacherBodyBase.refine(data => data.password === data.repeatPassword, {
    message: 'Passwords do not match',
    path: ['repeatPassword'],
})