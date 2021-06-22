const mongoose = require("mongoose");
const { Schema } = mongoose;

const Dao = require("./DAO");

const TempReservationSchema = new Schema({
    client: {
        email: {type: String}
    },
    isConfirmed: {type: String}
}, { _id: false });

const SessionSchema = mongoose.model("Session", new Schema ({
    instructor: {
        id: {type: Number},
        firstName: {type: String},
        lastName: {type: String}
    },
    service: {
        name: {type: String},
        roomCapacity: {type: Number}
    },
    capacity: {type: Number},
    schedule: {
        initialHour: {type: Number, required: true},
        totalHours: {type: Number},
        month: {type: Number},
        day: {type: Number}
    },
    reservations: [TempReservationSchema],
    status: {type: String}
}));

module.exports = class DaoSession extends Dao {
    async find(filter) {
        return await SessionSchema.find(filter);
    }

    async save(object) {
        const schema = this.toMongoSchema(object);
        return await schema.save();
    }

    async delete(filter) {
        return await SessionSchema.remove(filter);
    }

    async modify(filter, object) {
        const schema = await SessionSchema.findOne(filter);

        schema.instructor = {
            id: object.instructor.id,
            firstName: object.instructor.firstName,
            lastName: object.instructor.lastName
        };
        schema.service = {
            name: object.service.name,
            roomCapacity: object.service.roomCapacity
        };
        schema.capacity = object.capacity;
        schema.schedule = {
            initialHour: object.schedule.initialHour,
            totalHours: object.schedule.totalHours,
            month: object.schedule.month,
            day: object.schedule.day
        };
        schema.status = object.status;

        const reservations1 = [];
        if (object.reservations.length > 0) {
            object.reservations.values().forEach(reservation => {
                const schema1 = { 
                    client: {
                        email: reservation.client.email
                    },
                    isConfirmed: reservation.isConfirmed
                };
                reservations1.push(schema1);
            });
            schema.reservations = reservations1;
        }

        return await SessionSchema.updateOne(filter, schema);
    }

    async getAll() {
        return await SessionSchema.find({ });
    }

    toMongoSchema(object) {
        const reservations1 = [];
        if (object.reservations.length > 0) {
            object.reservations.values().forEach(reservation => {
                const schema = { 
                    client: {
                        email: reservation.client.email
                    },
                    isConfirmed: reservation.isConfirmed
                };
                reservations1.push(schema);
            });
        }

        return new SessionSchema({
            instructor: {
                id: object.instructor.id,
                firstName: object.instructor.firstName,
                lastName: object.instructor.lastName
            },
            service: {
                name: object.service.name,
                roomCapacity: object.service.roomCapacity
            },
            capacity: object.capacity,
            schedule: {
                initialHour: object.schedule.initialHour,
                totalHours: object.schedule.totalHours,
                month: object.schedule.month,
                day: object.schedule.day
            },
            reservations: reservations1,
            status: object.status
        });
    }
}