import User from './user';

export default class Instructor extends User {
    constructor(email, password, id, firstName, lastName, phone) {
        super(email, password, id, firstName, lastName, phone);
        this.#isTemp = false;
    }
    
    set setTemp() {
        this.#isTemp = true;
    }

    set setDefault() {
        this.#isTemp = false;
    }

    set addSpecialty(specialty) {

    }
}