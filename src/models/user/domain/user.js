class User {
    constructor({name, pass}) {
        this.name = name;
        this.pass = pass;
        let logged = false;
    }

    asLogged() {
        logged = true;
    }
}