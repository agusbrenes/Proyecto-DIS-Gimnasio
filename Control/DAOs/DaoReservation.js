const mongoose = require("mongoose");
const { Schema } = mongoose;

const Dao = require("./DAO");

const ReservationSchema = mongoose.model("Reservation", new Schema ({
    client: {
        id: {type: Number},
        firstName: {type: String},
        lastName: {type: String}
    },
    session1: {
        instructor: {
            id: {type: String},
            firstName: {type: String},
            lastName: {type: String}
        },
        service: {
            name: {type: String}
        }
    },
    paymentMethod: {
        name: {type: String}
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
        const schema = await ReservationSchema.findOne(filter);

        schema.client = {
            id: object.client.id,
            firstName: object.client.firstName,
            lastName: object.client.lastName
        };
        schema.session1 = {
            instructor: {
                id: object.session.instructor.id,
                firstName: object.session.instructor.firstName,
                lastName: object.session.instructor.lastName
            },
            service: {
                name: object.session.service.name
            }
        };
        schema.paymentMethod = {
            name: object.paymentMethod.name
        };
        schema.isConfirmed = object.isConfirmed;
    }   

    async getAll() {
        return ReservationSchema.find({ });
    }

    toMongoSchema(object) {
        return new ReservationSchema({
            id: object.id,
            client: {
                id: object.client.id,
                firstName: object.client.firstName,
                lastName: object.client.lastName
            },
            session1: {
                instructor: {
                    id: object.session.instructor.id,
                    firstName: object.session.instructor.firstName,
                    lastName: object.session.instructor.lastName
                },
                service: {
                    name: object.session.service.name
                }
            },
            paymentMethod: {
                name: object.paymentMethod.name
            },
            isConfirmed: object.isConfirmed
        });
    }
}