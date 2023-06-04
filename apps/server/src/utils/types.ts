import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';

import { z } from 'zod';
import { IAnswer } from '../answer/answerModel';
import { registerBody } from '../users/student/studentSchema';
import { loginBody } from '../signin/signinSchema';
import { registerTeacherBody } from '../users/admin/adminSchema';

export type Role = 'admin' | 'teacher' | 'student';

export type MiddlewareFunction = {
    (req: Request, res: Response, next: NextFunction): void;
};

export type Route = {
    route: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    role?: Role;
    body?: z.ZodObject<any, any> | z.ZodEffects<any, any>;
    auth?: boolean;
    middleware?: MiddlewareFunction[];
    controller: (req: Request, res: Response) => void;
};

export type HttpMethod = `${Lowercase<Route['method']>}`;

export type IRequest<Req = unknown, Res = unknown> = Request<
    Record<string, string>,
    Res,
    Req
>;

export type RegisterDTO = z.infer<typeof registerBody>;
export type LoginDTO = z.infer<typeof loginBody>;
export type TeacherRegisterDTO = z.infer<typeof registerTeacherBody>;

export type ExpressUser = {
    id: string;
    role: Role;
}

export type FilterQuery<T> = {
    _id: Types.ObjectId;
} & T;

export type QuestionDTO = {
    id: string;
    question: string;
    answers: IAnswer[];
    createdAt: Date;
}

export type ModelPopulationOptions = {
    path: string;
    select?: string;
};

export type CreateQuestionBody = {
    question: string;
    answers: string[];
}

export type QuestionIDs = {
    ids: string[];
}