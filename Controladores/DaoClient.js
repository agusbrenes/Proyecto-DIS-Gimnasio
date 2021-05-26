const Dao = require("./DAO");
const ClientSchema = require("../Modelo/ClientSchema");

module.exports = class DaoClient extends Dao {

    async find(filter) {
        return await ClientSchema.findOne(filter);
    }

    async save(object) {
        const schema = this.#toMongoSchema(object); //object.toMongoSchema();//
        return await schema.save();
    }

    delete() {
        throw new Error("Abstract Method has no implementation");
    }

    modify(){
        throw new Error("Abstract Method has no implementation");
    }

    #toMongoSchema(object) {
        return new ClientSchema({
            email: object.email,
            password: object.password,
            id: object.id,
            firstName: object.firstName,
            lastName: object.lastName,
            phone: object.phone,
            status: object.status,
            reservations: object.reservations.values(),
            subscriptions: object.subscriptions.values()
        });
    }    
}