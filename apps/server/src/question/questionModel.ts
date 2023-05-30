import mongoose, { Schema, Document } from 'mongoose';
import { IAnswer } from '../answer/answerModel';

export interface IQuestion extends Document {
    question: string;
    answers: IAnswer['_id'][];
    createdAt: Date;
}

const questionSchema: Schema = new Schema({
    question: { type: String, required: true },
    answers: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IQuestion>('Question', questionSchema);
