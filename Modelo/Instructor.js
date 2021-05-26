const User = require('./user');

module.exports = class Instructor extends User {
    constructor(email, password, id, firstName, lastName, phone) {
        super(email, password, id, firstName, lastName, phone);
        this.#isTemp = false;
        this.#room = null;
        this.#services = [];
        this.#sessions = [];
    }
    
    setTemp() {
        this.#isTemp = true;
    }

    setDefault() {
        this.#isTemp = false;
    }

    set addSpecialty(specialty) {

    }
}