const mongoose = require("mongoose");
const { Schema } = mongoose;

const Dao = require("./DAO");
//const ClientSchema = require("../Modelo/ClientSchema");

const ClientSchema = mongoose.model("Client", new Schema({
    email: {type: String, unique: true},
    password: {type: String, required: true, minlength: 8},
    id: {type: String, unique: true},
    firstName: {type: String},
    lastName: {type: String},
    phone: {type: String},
    status: {type: String},
    reservations: [{
        id: {type: Number}
    }],
    subscriptions: [{
        id: {type: Number}
    }]
}));

module.exports = class DaoClient extends Dao {

    async find(filter) {
        return await ClientSchema.findOne(filter);
    }

    async save(object) {
        const schema = this.toMongoSchema(object);
        return await schema.save();
    }

    delete() {
        throw new Error("Abstract Method has no implementation");
    }

    modify(){
        throw new Error("Abstract Method has no implementation");
    }

    toMongoSchema(object) {
        const reservations = [];
        object.reservations.values().forEach(reservation => {
            reservations.push(reservation.getId());
        });
        const subscriptions = [];
        object.subscriptions.values().forEach(subscription => {
            subscriptions.push(subscription.getId());
        });
        return new ClientSchema({
            email: object.email,
            password: object.password,
            id: object.id,
            firstName: object.firstName,
            lastName: object.lastName,
            phone: object.phone,
            status: object.status,
            reservations: reservations,
            subscriptions: subscriptions
        });
    }    
}