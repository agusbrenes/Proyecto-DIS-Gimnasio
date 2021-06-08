const mongoose = require("mongoose");
const { Schema } = mongoose;

const Dao = require("./DAO");

const ReservationSchema = mongoose.model("Reservation", new Schema ({
    id: {type: Number, index: true},
    client: {
        id: {type: Number, unique: true}
    },
    session1: {
        id: {type: Number, unique: true}
    },
    paymentMethod: {
        id: {type: Number, unique: true}
    },
    isConfirmed: {type: Boolean}
}));

module.exports = class DaoReservation extends Dao {
    async find(filter) {
        return await ReservationSchema.find(filter);
    }

    async save(object) {
        const schema = this.toMongoSchema(object);
        return await schema.save();
    }

    async delete(filter) {
        return await ReservationSchema.remove(filter);
    }

    async modify(filter, object) {
        const schema = ReservationSchema.findOne(filter);

        schema.id = object.id;
        schema.client.id = object.client.id;
        schema.session1.id = object.session.id;
        schema.paymentMethod.id = object.paymentMethod.id;
        schema.isConfirmed = object.isConfirmed;
    }   

    async getAll() {
        return ReservationSchema.find({ });
    }

    toMongoSchema(object) {
        return new ReservationSchema({
            id: object.id,
            client: {
                id: object.client.id
            },
            session1: {
                id: object.session.id
            },
            paymentMethod: {
                id: object.paymentMethod.id
            },
            isConfirmed: object.isConfirmed
        });
    }
}