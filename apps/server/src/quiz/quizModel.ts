import mongoose, { Document, Schema, Types } from "mongoose";
import { IQuestion } from "../question/questionModel";

interface IQuiz extends Document {
    name: string;
    questions: IQuestion['_id'][];
    timeLimit: number;
    totalMarks: number;
    passMarks: number;
    createdBy: Types.ObjectId; // Reference to a Teacher or Admin model
}

const QuizSchema = new Schema<IQuiz>({
    name: { type: String, required: true },
    questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
    timeLimit: { type: Number, required: true },
    totalMarks: { type: Number, required: true },
    passMarks: { type: Number, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true }
});

const Quiz = mongoose.model<IQuiz>('Quiz', QuizSchema);

export { Quiz, IQuiz };
