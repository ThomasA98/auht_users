import { envSchema } from './schema'

export default envSchema.parse({
    PORT        : process.env.PORT,
    SECRET_JWT  : process.env.SECRET_JWT,
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV    : process.env.NODE_ENV,
})