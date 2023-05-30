import mongoose from 'mongoose';
import env  from './utils/env';

const connectionOptions = {
    maxPoolSize: env.MONGO_POOLSIZE,
};

export const databaseConnection = async () => {
    return mongoose.connect(env.ATLAS_URI, connectionOptions);
};
