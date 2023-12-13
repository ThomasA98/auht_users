import { Router } from 'express'
import { Prisma } from '@prisma/client'
import { ZodError } from 'zod'
import { hashSync, compareSync } from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { authBodySchema } from 'src/schema'
import { UserError } from 'src/errors'

import { db } from '../database'

import env from '../env'

export default Router()
    .post('/register', async (req, res) => {
        try {
            const { name, password, email } = authBodySchema.parse(req.body)

            const { id } = await db.user.create({
                data: {
                    name,
                    email,
                    password: hashSync(password, 10),
                }
            })

            const token = jwt.sign({
                id,
                name,
                email,
            }, env.SECRET_JWT)

            return res.status(200).json({
                id,
                name,
                email,
                token,
            })
        } catch (error) {
            if (error instanceof ZodError) return res.status(400).json({
                message: `validation error: ${ error.message }`,
            })

            if ( error instanceof Prisma.PrismaClientKnownRequestError) return res.status(400).json({
                message: 'server error'
            })

            return res.status(400).json({
                message: 'Error unknown',
            })
        }

    })
    .post('/login', async (req, res) => {
        try {
            const { name, password, email } = authBodySchema.parse(req.body)

            const user = await db.user.findUnique({
                where: {
                    email
                }
            })

            if (!user) throw new UserError('user not found', 404)

            if (compareSync(password, user.password)) throw new UserError('password or name is incorrect')

            const { id } = user

            const token = jwt.sign({
                id,
                name,
                email,
            }, env.SECRET_JWT)

            return res.status(200).json({
                id,
                name,
                email,
                token,
            })
        } catch (error) {
            if (error instanceof ZodError) return res.status(400).json({
                message: `validation error: ${ error.message }`,
            })

            if ( error instanceof Prisma.PrismaClientKnownRequestError) return res.status(400).json({
                message: 'server error'
            })

            if (error instanceof UserError) return res.status(error.status).json({
                message: error.message,
            })

            return res.status(400).json({
                message: 'Error unknown',
            })
        }

    })