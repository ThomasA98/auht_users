import { randomUUID } from 'crypto'
import { Router } from 'express'
import jwt from 'jsonwebtoken'
import { ZodError, z } from 'zod'

import env from '../env'

export interface Auth {
    id?: string
    token?: string
    name: string
    password: string
}

const authBodySchema = z.object({
    name: z.string().min(4, 'name is extremely short'),
    password: z.string().min(8, 'password is very short'),
})

export default Router()
    .post('/register', (req, res) => {
        try {
            const validateBody = authBodySchema.parse(req.body)

            // dummy database
            const { id, name } = authService.register(validateBody)

            const token = jwt.sign({
                id,
                name,
            }, env.SECRET_JWT)

            return res.status(200).json({
                id,
                name,
                token,
            })
        } catch (error) {
            if (error instanceof ZodError) return res.status(400).json({
                message: `validation error: ${ error.message }`,
            })

            return res.status(400).json({
                message: 'Error unknown',
            })
        }

    })
    .post('/login', (req, res) => {
        try {
            const { name, password } = authBodySchema.parse(req.body)

            // dummy database
            const user = authService.findFirstByName(name)

            if (!user) throw new UserError('user not found', 404)

            if (user.password !== password) throw new UserError('password or name is incorrect')

            const { id } = user

            const token = jwt.sign({
                id,
                name,
            }, env.SECRET_JWT)

            return res.status(200).json({
                id,
                name,
                token,
            })
        } catch (error) {
            if (error instanceof ZodError) return res.status(400).json({
                message: `validation error: ${ error.message }`,
            })

            if (error instanceof UserError) return res.status(error.status).json({
                message: error.message,
            })

            return res.status(400).json({
                message: 'Error unknown',
            })
        }

    })

export class UserError extends Error {

    status: number

    constructor(message: string, status: number = 400) {
        super(`user error: ${ message }`)
        this.status = status
    }

}

    // persistance off
export class AuthDB {

    #users: Map<string, Auth> = new Map()

    constructor() {}

    register(user: Auth) {
        const id = randomUUID()
        this.#users.set(id, user)
        return {
            ...user,
            id
        }
    }

    findUnique(id: string) {
        return this.#users.get(id)
    }

    findFirstByName(name: string) {
        for (const user of this.#users.values()) {
            if (user.name === name) return user
        }
    }

}

const authService = new AuthDB()