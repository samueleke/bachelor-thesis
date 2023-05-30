import mongoose, { Schema, Document } from 'mongoose';

export interface IAnswer extends Document {
    text: string;
    isCorrect: boolean;
}

const answerSchema: Schema = new Schema({
    text: { type: String, required: true },
    isCorrect: { type: Boolean, required: true },
});

export const Answer = mongoose.model<IAnswer>('Answer', answerSchema);
