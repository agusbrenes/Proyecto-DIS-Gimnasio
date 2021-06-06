const mongoose = require("mongoose");
const { Schema } = mongoose;

const Dao = require("./DAO");

const TempReservationSchema = new Schema({
    id: {type: Number, required: true}
});

const TempSubscriptionSchema = new Schema({
    id: {type: Number, required: true}
});

const ClientSchema = mongoose.model("Client", new Schema({
    email: {type: String, index: true},
    password: {type: String, required: true, minlength: 8},
    id: {type: String, index: true},
    firstName: {type: String},
    lastName: {type: String},
    phone: {type: String},
    status: {type: String},
    reservations: [TempReservationSchema],
    subscriptions: [TempSubscriptionSchema]
}));

module.exports = class DaoClient extends Dao {

    async find(filter) {
        return await ClientSchema.find(filter);
    }

    async save(object) {
        const schema = this.toMongoSchema(object);
        return await schema.save();
    }

    async delete(filter) {
        return await ClientSchema.remove(filter);
    }

    async modify(id, object){
        const schema = this.toMongoSchema(object);
        return await schema.save(id);
    }

    async getAll() {
        return await ClientSchema.find({ });
    }

    toMongoSchema(object) {
        const reservations1 = [];
        if (object.reservations.size > 0) {
            object.reservations.values().forEach(reservation => {
                const schema = new TempReservationSchema({
                    id: reservation.id
                });
                reservations1.push(schema);
            });
        }
        const subscriptions1 = [];
        if (object.subscriptions.size > 0) {
            object.subscriptions.values().forEach(subscription => {
                const schema = new TempSubscriptionSchema({
                    id: subscription.id
                });
                subscriptions1.push(schema);
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
            reservations: reservations1,
            subscriptions: subscriptions1
        });
    }    
}