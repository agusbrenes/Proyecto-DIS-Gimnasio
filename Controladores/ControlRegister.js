const Client = require("../Modelo/Client");

const bcrypt = require("bcryptjs");
const DaoClient = require("./DaoClient");

module.exports = class ControlRegister {
    constructor(){
        this.handler = null;
    }

    async findClient(filter) {
        this.handler = new DaoClient();
        return await this.handler.find(filter);
    }

    async saveClient(email, password, id, firstName, lastName, phone) {
        this.handler = new DaoClient();
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        //console.log(passwordHash);
        const client = new Client(
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