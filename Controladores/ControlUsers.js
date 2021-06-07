const bcrypt = require("bcryptjs");
const Controller = require("./Controller");

module.exports = class ControlUsers extends Controller {
    constructor(handler) {
        super(handler);
        this.factory = null;
    }

    set setFactory(factory) {
        this.factory = factory;
    }

    async find(filter) {
        return await super.find(filter);
    }

    async save(object) {
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(object.password, salt);
        const user = this.factory.createUser(
            object.email,
            passwordHash,
            object.id,
            object.firstName,
            object.lastName,
            object.phone
        );
        return await this.handler.save(user);
    }

    async modify(filter, object) {
        const salt = await bcrypt.genSalt();
        if (!(object.password.length === 0)) {
            object.password = await bcrypt.hash(object.password, salt);
        }
        return await this.handler.modify(filter, object);
    }

    async delete(filter) {
        return await super.delete(filter);
    }
}