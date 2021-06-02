const mongoose = require("mongoose");
const { Schema } = mongoose;
const ObjectId = mongoose.Types.ObjectId;

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
        const schema = this.#toMongoSchema(object);
        return await schema.save();
    }

    async delete(filter) {
        return await ClientSchema.remove(filter);
    }

    async modify(filter, object){        
        return await ClientSchema.updateOne(filter, object);
    }

    #toMongoSchema(object) {
        const reservations = [];
        if (object.reservations.size > 0) {
            const reservations = [];
            object.reservations.values().forEach(reservation => {
                reservations.push({id: reservation.getId()});
            });
        }
        const subscriptions = [];
        if (object.subscriptions.size > 0) {
            const subscriptions = [];
            object.subscriptions.values().forEach(subscription => {
                subscriptions.push({id: subscription.getId()});
            });
        }
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