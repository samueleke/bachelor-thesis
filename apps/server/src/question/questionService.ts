import { FilterQuery } from "../utils/types";
import { mapQuestion } from "./questionMapper";
import questionModel, { IQuestion } from "./questionModel";
import * as provider from "./questionProvider";

export const getQuestionById = async (id: string) => {
    const filter = { _id: id } as FilterQuery<IQuestion>;
    const question = await provider.queryQuestion(filter, questionModel);
    return mapQuestion(question);
}

export const getQuestions = async () => {
    const questions = await provider.queryModel(questionModel, { path: 'answers' });

    return questions.map(mapQuestion);
}

export const createQuestion = async (question: string, answers: string[]) => {
    const newQuestion = await questionModel.create({ question, answers });
    return mapQuestion(newQuestion);
}