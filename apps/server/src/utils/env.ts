import {z} from 'zod';

const envSchema = z.object({
    PORT: z.string().default('3000'),
    ATLAS_URI: z.string().default('mongodb://localhost:27017'),
    JWT_SECRET: z.string().default('secret'),
    MONGO_POOLSIZE: z.number().default(10),
});

const envResult = envSchema.safeParse(process.env);

if (!envResult.success) {
    throw new Error(envResult.error.message);
}

const env = envResult.data;
export default env;
