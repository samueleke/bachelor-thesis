import mongoose from "mongoose";
import { FilterQuery, ModelPopulationOptions } from "../utils/types";
// eslint-disable-next-line @nx/enforce-module-boundaries
import {APIError} from "../../../../packages/shared/errors";

export const queryQuestion = async <T>(filter: FilterQuery<T>, model: mongoose.Model<T>) => {
    if (!mongoose.Types.ObjectId.isValid(filter._id.toString()))
        throw new APIError(400, { message: 'Invalid id' })

    try {
        const entity = await model.findOne(filter, {}).populate('answers');
        if (!entity) throw new APIError(404, { message: `ID: ${filter._id}, not found` })

        return entity;
    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            throw new APIError(500, { message: error.message })
        }
    }

}


export const queryModel = async <T>(model: mongoose.Model<T>, option?: ModelPopulationOptions) => {
    try {
        // Retrieve all entities from the specified model and populate the specified option (if provided)
        const query = model.find({})
        if (option) {
            query.populate(option as ModelPopulationOptions);
        }

        const entities = await query.exec();
        return entities;
    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            throw new APIError(500, { message: error.message })
        }
    }
}

export const deleteSelectedQuestions = async <T>(filter: FilterQuery<T>, model: mongoose.Model<T>) => {
    try {
        return await model.deleteMany(filter);
    } catch (error) {
        console.log(error);
        if (error instanceof mongoose.Error.CastError) {
            throw new APIError(400, { message: 'Invalid filter parameters', filter })
        }
        if (error instanceof Error) {
            throw new APIError(500, { message: error.message })
        }
    }
}