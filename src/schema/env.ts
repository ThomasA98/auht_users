import { z } from 'zod'

export const envSchema = z.object({
    PORT: z.string().default('3000'),
    SECRET_JWT: z.string().min(10),
    DATABASE_URL: z.string().min(4).url(),
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development')
})