// eslint-disable-next-line @nx/enforce-module-boundaries
import {APIError} from "../../../../packages/shared/errors";
import { FilterQuery } from "../utils/types";
import { mapQuestion } from "./questionMapper";
import questionModel, { IQuestion } from "./questionModel";
import * as provider from "./questionProvider";

export const getQuestionById = async (id: string) => {
    try {
        const filter = { _id: id } as FilterQuery<IQuestion>;
        const question = await provider.queryQuestion(filter, questionModel);

        if (!question) throw new APIError(404, { message: `ID: ${id}, not found` });
        return mapQuestion(question);
    } catch (error) {
        console.error(error);
        if (error instanceof APIError) {
            throw error
        }
        else if (error instanceof Error) {
            throw new APIError(500, { message: `Error while getting question by ID: ${error.message}` })
        }
    }
}

export const getQuestions = async () => {
    try {
        const questions = await provider.queryModel(questionModel, { path: 'answers' });
        if (!questions) throw new APIError(404, { message: `No questions found` });

        return questions.map(mapQuestion);
    } catch (error) {
        console.error(error);
        if (error instanceof APIError) {
            throw error
        }
        else if (error instanceof Error) {
            throw new APIError(500, { message: `Error while getting questions: ${error.message}` })
        }
    }
}

export const createQuestion = async (question: string, answers: string[]) => {
    try {
        const newQuestion = await questionModel.create({ question, answers });
        if (!newQuestion) throw new APIError(500, { message: `Error while creating question` });
        return mapQuestion(newQuestion);
    } catch (error) {
        console.error(error);
        if (error instanceof APIError) {
            throw error
        }
        else if (error instanceof Error) {
            throw new APIError(500, { message: `Error while creating question: ${error.message}` })
        }
    }
}

export const deleteSelectedQuestions = async (ids: string[]) => {
    try {
        const filter = { _id: { $in: ids } } as FilterQuery<IQuestion>;
        const deletedQuestions = await provider.deleteSelectedQuestions(filter, questionModel);

        if(!deletedQuestions) throw new APIError(404, {message: `No questions found`})
    } catch (error) {
        console.error(error);
        if (error instanceof APIError) {
            throw error
        }
        else if (error instanceof Error) {
            throw new APIError(500, { message: `Error while deleting questions: ${error.message}` })
        }
    }
}