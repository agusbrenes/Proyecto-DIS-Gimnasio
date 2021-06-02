const mongoose = require("mongoose");
const { Schema } = mongoose;

const Dao = require("./DAO");

const ReservationSchema = mongoose.model("Reservation", new Schema ({
    id: {type: Number},
    client: {
        email: {type: String}
    },
    session: {
        id: {type: Number}
    },
    paymentMethod: {
        id: {type: Number, default: undefined}
    },
    isConfirmed: {type: Boolean}
}));

module.exports = class DaoReservation extends Dao {
    async find(filter) {
        return await ReservationSchema.findOne(filter);
    }

    async save(object) {
        const schema = this.toMongoSchema(object);
        return await schema.save();
    }

    async delete(filter) {
        return await ReservationSchema.remove(filter);
    }

    async modify(filter, object) {
        return await ReservationSchema.updateOne(filter);
    }

    toMongoSchema(object) {
        return new ReservationSchema({
            id: object.id,
            client: {
                email: object.client.email
            },
            session: {
                id: object.session.id
            },
            paymentMethod: {
                id: object.paymentMethod.id
            },
            isConfirmed: object.isConfirmed
        });
    }
}