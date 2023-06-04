import { z } from 'zod';

const envSchema = z.object({
    PORT: z.string().default('3000'),
    ATLAS_URI: z.string().default('mongodb://localhost:27017'),
    JWT_SECRET: z.string().default('secret'),
    MONGO_POOLSIZE: z
        .string()
        .optional()
        .default('10')
        // * Tranform zod value from string to number see (https://zod.dev/?id=validating-during-transform)
        .transform((val, ctx) => {
            const parsed = Number(val);

            if (!isNaN(parsed)) {
                return parsed;
            }

            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Not a number',
            });

            // This is a special symbol you can use to
            // return early from the transform function.
            // It has type `never` so it does not affect the
            // inferred return type.
            return z.NEVER;
        }),
        CLIENT_URL: z.string().default('http://localhost:5173'),
});

const envResult = envSchema.safeParse(process.env);

if (!envResult.success) {
    throw new Error(envResult.error.message);
}

const env = envResult.data;
export default env;
