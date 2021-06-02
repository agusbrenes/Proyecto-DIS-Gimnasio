const bcrypt = require("bcryptjs");

module.exports = class ControlUsers {
    constructor(){
        this.handler = null;
        this.factory = null;
    }

    async find(filter, handler) {
        this.handler = handler;
        return await this.handler.find(filter);
    }

    async save(handler, factory, object) {
        this.handler = handler;
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

    async modify(filter, handler, object) {
        this.handler = handler;
        //const objectId = object._id;
        const salt = await bcrypt.genSalt();
        object.password = await bcrypt.hash(object.password, salt);
        return await this.handler.modify(filter, object);
    }

    async delete(filter, handler) {
        this.handler = handler;
        return await this.handler.delete(filter);
    }
}