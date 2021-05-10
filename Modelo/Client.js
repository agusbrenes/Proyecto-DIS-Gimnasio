import { Al_Dia, Moroso } from './status';
import User from './user';

export default class Client extends User {
    constructor(email, password, id, firstName, lastName, phone) {
        super(email, password, id, firstName, lastName, phone);
        this.#status = Al_Dia;
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