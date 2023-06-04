// eslint-disable-next-line @nx/enforce-module-boundaries
import {APIError} from "../../../../packages/shared/errors";
import { CreateQuestionBody, IRequest, QuestionIDs } from "../utils/types";
import * as service from './questionService'


export const getQuestion = async (req: IRequest) => {
    const id = req.params.id;
    if(!id) throw new APIError(400, {message: 'Missing question id'})

    return await service.getQuestionById(id);
}

export const getQuestions = async () => {
    return await service.getQuestions();
}

export const createQuestion = async (req: IRequest<CreateQuestionBody>) => {
    const { question, answers } = req.body;
    if(!question) throw new APIError(400, {message: 'Missing question'})
    if(!answers) throw new APIError(400, {message: 'Missing answers'})

    return await service.createQuestion(question, answers);
}

export const deleteSelectedQuestions = async (req: IRequest<QuestionIDs>) => {
    const { ids } = req.body;
    if(!ids) throw new APIError(400, {message: 'Missing question ids'})

    return await service.deleteSelectedQuestions(ids);
}