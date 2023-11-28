export interface UserProps {
    name: string
    pass: string
}

export class User implements UserProps {

    #name   : string
    #pass   : string
    #logged : boolean

    constructor({name, pass}: UserProps) {
        this.#name = name;
        this.#pass = pass;
        this.#logged = false;
    }
    public get name(): string {
        return this.#name
    }
    public set name(value: string) {
        this.#name = value
    }
    public get pass(): string {
        return this.#pass
    }
    public set pass(value: string) {
        this.#pass = value
    }
    asLogged() {
        this.#logged = true;
    }
}