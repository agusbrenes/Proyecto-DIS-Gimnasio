const bcrypt = require("bcryptjs");
const Controller = require("./Controller");

module.exports = class ControlUsers extends Controller {
    constructor(handler){
        super(handler);
        this.factory = null;
    }

    async save(factory, object) {
        this.factory = factory;
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
        object.password = await bcrypt.hash(object.password, salt);
        return await this.handler.modify(filter, object);
    }

    async getAll() {
        return await this.handler.getAll();
    }
}