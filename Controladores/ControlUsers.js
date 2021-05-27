const Client = require("../Modelo/Client");
const FactoryAdmin = require("../Modelo/FactoryAdmin");
const FactoryClient = require("../Modelo/FactoryClient");
const FactoryInstructor = require("../Modelo/FactoryInstructor");

const bcrypt = require("bcryptjs");
const DaoClient = require("./DaoClient");

module.exports = class ControlUsers {
    constructor(){
        this.handler = null;
        this.factory = null;
    }

    async find(filter, handler) {
        this.handler = handler;
        return await this.handler.find(filter);
    }

    async save(handler, factory, email, password, id, firstName, lastName, phone) {
        this.handler = handler;
        this.factory = factory;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const user = this.factory.createUser(
            email,
            passwordHash,
            id,
            firstName,
            lastName,
            phone
        );
        return await this.handler.save(user);
    }
}