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
        name: {type: String}
    },
    room: {
        name: {type: String},
        capacity: {type: Number}
    },
    capacity: {type: Number},
    year: {type: Number},
    schedule: {
        month: {type: Number},
        day: {type: Number},
        initialHour: {type: Number},
        totalHours: {type: Number}
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
            name: object.service.name
        };
        schema.room = {
            name: object.room.name,
            capacity: object.room.capacity
        }
        schema.capacity = object.capacity;
        schema.year = object.year;
        schema.schedule = {
            month: object.schedule.month,
            day: object.schedule.day,
            initialHour: object.schedule.initialHour,
            totalHours: object.schedule.totalHours
        };
        schema.status = object.status;

        const reservations1 = [];
        if (object.reservations.length > 0) {
            object.reservations.forEach(reservation => {
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
            object.reservations.forEach(reservation => {
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
                name: object.service.name
            },
            room: {
                name: object.room.name,
                capacity: object.room.capacity
            },
            capacity: object.capacity,
            year: object.year, 
            schedule: {
                month: object.schedule.month,
                day: object.schedule.day,
                initialHour: object.schedule.initialHour,
                totalHours: object.schedule.totalHours
            },
            reservations: reservations1,
            status: object.status
        });
    }
}