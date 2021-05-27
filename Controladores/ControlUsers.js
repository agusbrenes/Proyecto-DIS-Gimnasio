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

    async findClient(filter) {
        this.handler = new DaoClient();
        return await this.handler.find(filter);
    }

    async saveClient(email, password, id, firstName, lastName, phone) {
        this.handler = new DaoClient();
        this.factory = new FactoryClient();
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        //console.log(passwordHash);
        const client = this.factory.createUser(
            email,
            passwordHash,
            id,
            firstName,
            lastName,
            phone
        );
        return await this.handler.save(client);
    }
}