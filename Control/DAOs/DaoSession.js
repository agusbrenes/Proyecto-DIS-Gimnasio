const mongoose = require("mongoose");
const { Schema } = mongoose;

const Dao = require("./DAO");

const TempReservationSchema = new Schema({
    id: {type: Number, required: true}
}, { _id: false });

const SessionSchema = mongoose.model("Session", new Schema ({
    id: {type: Number, index: true},
    instructor: {
        id: {type: Number}
    },
    service: {
        id: {type: Number},
    },
    capacity: {type: Number},
    day: {
        number: {type: Number},
        name: {type: String}
    },
    schedule: {
        id: {type: Number},
        beginTime: {type: String},
        endTime: {type: String}
    },
    reservations: [TempReservationSchema]
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

        schema.id = object.id;
        schema.instructor = {id: object.instructor.id};
        schema.service = {id: object.service.id};
        schema.capacity = object.capacity;
        schema.day = {
            number: object.day.number,
            name: object.day.name
        };
        schema.schedule = {
            id: object.schedule.id,
            beginTime: object.schedule.beginTime,
            endTime: object.schedule.endTime
        };

        const reservations1 = [];
        if (object.reservations.length > 0) {
            object.reservations.values().forEach(reservation => {
                const schema1 = { id: reservation.id };
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
                const schema = { id: reservation.id };
                reservations1.push(schema);
            });
        }

        return new SessionSchema({
            id: object.id,
            instructor: {
                id: object.instructor.id
            },
            service: {
                id: object.service.id
            },
            capacity: object.capacity,
            day: {
                number: object.day.number,
                name: object.day.name
            },
            schedule: {
                id: object.schedule.id,
                beginTime: object.schedule.beginTime,
                endTime: object.schedule.endTime
            },
            reservations: reservations1
        });
    }
}