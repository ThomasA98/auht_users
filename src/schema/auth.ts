import { z } from 'zod';

export const authBodySchema = z.object({
    name: z.string().min(4, 'name is extremely short'),
    password: z.string().min(8, 'password is very short'),
    email: z.string().email(),
})