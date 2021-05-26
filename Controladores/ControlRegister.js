const ClientSchema = require("../Modelo/ClientSchema");
const Client = require("../Modelo/Client");

const bcrypt = require("bcryptjs");

module.exports = class ControlRegister {

    async findClient(filter) {
        return await ClientSchema.findOne(filter);
    }

    async saveClient(email, password, id, firstName, lastName, phone) {
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        console.log(passwordHash);
        const client = new Client(
            email,
            passwordHash,
            id,
            firstName,
            lastName,
            phone
        );
        const schema = client.toMongoSchema();
        return await schema.save();
    }
}