const mongoose = require("mongoose");
const { Schema } = mongoose;

const Dao = require("./DAO");

const TempReservationSchema = new Schema({
    id: {type: Number, required: true}
});

const SessionSchema = mongoose.model("Session", new Schema ({
    id: {type: Number, index: true},
    instructor: {
        email: {type: String, unique: true}
    },
    service: {
        id: {type: Number, unique: true},
    },
    capacity: {type: Number},
    day: {
        number: {type: Number},
        name: {type: String}
    },
    schedule: {
        id: {type: Number, unique: true}
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

    async modify(id, object) {
        const schema = this.toMongoSchema(object);
        return await schema.save(id);
    }

    async getAll() {
        return await SessionSchema.find({ });
    }

    toMongoSchema(object) {
        const reservations1 = [];
        if (object.reservations.length > 0) {
            object.reservations.values().forEach(reservation => {
                const schema = new TempReservationSchema({
                    id: reservation.id
                });
                reservations1.push(schema);
            });
        }

        return new SessionSchema({
            id: object.id,
            instructor: {
                email: object.instructor.email
            },
            service: {
                id: object.service.id
            },
            capacity: object.capacity,
            day: {
                number: object.day.id,
                name: object.day.name
            },
            schedule: {
                id: object.schedule.id
            },
            reservations: reservations1
        });
    }
}