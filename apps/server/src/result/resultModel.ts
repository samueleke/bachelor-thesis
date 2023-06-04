import mongoose, { Document, Schema } from "mongoose";
import { TStudent } from "../users/student/studentModel";
import { IAnswer } from "../answer/answerModel";
import { IQuestion } from "../question/questionModel";

interface IResult extends Document {
    student: TStudent['_id']; // Reference to student
    question: IQuestion['_id']; // Reference to question
    answer: IAnswer['_id']; // Reference to answer
    isCorrect: boolean;
    answeredAt: Date;
}

const ResultSchema = new Schema<IResult>({
    student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    question: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
    answer: { type: Schema.Types.ObjectId, ref: 'Answer', required: true },
    isCorrect: { type: Boolean, required: true },
    answeredAt: { type: Date, default: Date.now }
});

const Result = mongoose.model<IResult>('Result', ResultSchema);

export { Result, IResult };
