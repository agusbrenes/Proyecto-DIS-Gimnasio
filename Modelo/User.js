export default class User {
    constructor(email, password, id, firstName, lastName, phone) {
        this.#email = email;
        this.#password = password;
        this.#id = id;
        this.#firstName = firstName;
        this.#lastName = lastName;
        this.#phone = phone;
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

    /**
     * @param {Number} id
     */
     set setId(id) {
        this.#id = id;
    }

    get getId() {
        return this.#id;
    }    

    /**
     * @param {String} firstName
     */
    set setFirstName(firstName) {
        this.#firstName = firstName;
    }

    get getFirstName() {
        return this.#firstName;
    }    

    /**
     * @param {String} lastName
     */
    set setLastName(lastName) {
        this.#lastName = lastName;
    }

    get getLastName() {
        return this.#lastName;
    }    

    /**
     * @param {Number} phone
     */
    set setPhone(phone) {
        this.#phone = phone;
    }

    get getPhone() {
        return this.#phone;
    }   

}