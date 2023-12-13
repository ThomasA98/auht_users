export class UserError extends Error {

    status: number

    constructor(message: string, status: number = 400) {
        super(`user error: ${ message }`)
        this.status = status
    }

}