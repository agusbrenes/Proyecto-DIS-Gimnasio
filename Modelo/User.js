export default class User {
    constructor(email, password) {
        this.#email = email;
        this.#password = password;
    }

    /**
     * @param {String} email
     */
    set setEmail(email) {
        this.#email = email;
    }

    get getEmail() {
        return this.#email;
    }

    /**
     * @param {String} password
     */
    set setPassword(password) {
        this.#password = password;
    }

    get getPassword() {
        return this.#password;
    }

}