import { APIError } from "shared/errors";
import { IRequest } from "../utils/types";
import * as service from './questionService'


export const getQuestion = async (req: IRequest) => {
    const id = req.params.id;
    if(!id) throw new APIError(400, {message: 'Missing question id'})

    return await service.getQuestionById(id);
}

export const getQuestions = async () => {
    return await service.getQuestions();
}
