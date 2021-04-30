import { Al_Dia, Moroso } from './status';
import User from './user';

export default class Client extends User {
    constructor(email, password) {
        super(email, password);
        this.#id = null;
        this.#firstName = null;
        this.#lastName = null;
        this.#phone = null;
        this.#status = null;
    }

    /**
     * @param {String} email
     */
    /*
    set setEmail(email) {
        super.setEmail(email);
    }

    get getEmail() {
        return super.getEmail();
    }

    /**
     * @param {String} password
     */
    /*
    set setPassword(password) {
        super.setPassword(password);
    }

    get getPassword() {
        return super.getPassword();
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

    set setAlDia() {
        this.#status = Al_Dia;
    }  

    set setMoroso() {
        this.#status = Moroso;
    }  

    get getStatus() {
        return this.#status;
    }

}