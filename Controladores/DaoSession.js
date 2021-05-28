const mongoose = require("mongoose");
const { Schema } = mongoose;

const Dao = require("./DAO");

const SessionSchema = mongoose.model("Session", new Schema ({
    id: {type: Number},
    instructor: {
        id: {type: String},
        email: {type: String, unique: true}
    },
    service: {
        id: {type: Number},
        description: {type: String}
    },
    capacity: {type: Number},
    day: {
        number: {type: Number},
        name: {type: String}
    },
    schedule: {
        id: {type: Number}
    },
    reservations: [{
        id: {type: Number, unique: true}
    }]
}));

module.exports = class DaoSession extends Dao {
    async find(filter) {
        return await SessionSchema.findOne(filter);
    }

    async save(object) {
        const schema = this.#toMongoSchema(object);
        return await schema.save();
    }

    delete() {
        throw new Error("Abstract Method has no implementation");
    }

    modify() {
        throw new Error("Abstract Method has no implementation");
    }

    #toMongoSchema(object) {
        return new SessionSchema({
            id: object.id,
            instructor: {
                id: object.instructor.id,
                email: object.instructor.email
            },
            service: {
                id: object.service.id,
                description: object.service.description
            },
            capacity: object.capacity,
            day: {
                number: object.day.id,
                name: object.day.name
            },
            schedule: {
                id: object.schedule.id
            },
            reservations: [] //TODO: pending this.
        });
    }
}