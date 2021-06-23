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
        service: {
            name: {type: String}
        },
        schedule: {
            month: {type: Number},
            day: {type: Number}
        },
        plan: {
            initialHour: {type: Number, required: true},
            totalHours: {type: Number},
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
            },
            schedule: {
                initialHour: object.session.schedule.initialHour,
                totalHours: object.session.schedule.totalHours
            },
            plan: {
                month: object.session.plan.month,
                day: object.session.plan.day
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
                },
                schedule: {
                    initialHour: object.session.schedule.initialHour,
                    totalHours: object.session.schedule.totalHours
                },
                plan: {
                    month: object.session.plan.month,
                    day: object.session.plan.day
                }
            },
            paymentMethod: {
                name: object.paymentMethod.name
            },
            isConfirmed: object.isConfirmed
        });
    }
}