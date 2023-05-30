import { Route } from '../utils/types';
import * as questionController from './questionController';

const getQuestion: Route = {
    route: '/question/:id',
    method: 'GET',
    role: 'teacher',
    auth: true,
    middleware: [],
    controller: questionController.getQuestion,
}

export const questionRoutes = () => {
    return [getQuestion];
}