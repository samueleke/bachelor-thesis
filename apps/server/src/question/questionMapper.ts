import { QuestionDTO } from "../utils/types";
import { IQuestion } from "./questionModel";

export const mapQuestion = (questionDoc: IQuestion): QuestionDTO => {
    const { _id: id, question, answers, createdAt } = questionDoc;
    return {
        id,
        question,
        answers,
        createdAt
    }
}