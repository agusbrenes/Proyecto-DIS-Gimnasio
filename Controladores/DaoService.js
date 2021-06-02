const mongoose = require("mongoose");
const { Schema } = mongoose;

const Dao = require("./DAO");

const ServiceSchema = mongoose.model("Service", new Schema ({
    id: {type: Number, unique: true},
    description: {type: String},
    capacity: {type: Number},
    room: {
        name: {type: String}
    },
    instructors: [{
        email: {type: String, unique: true}
    }],
    sessions: [{
        id: {type: Number, unique: true}
    }]
}));

module.exports = class DaoService extends Dao {
    async find(filter) {
        return await ServiceSchema.findOne(filter);
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
        const instructors = [];
        object.instructors.values().forEach(instructor => {
            instructors.push(instructor.getEmail());
        });

        const sessions = [];
        object.sessions.values().forEach(session => {
            sessions.push(session.getId());
        });

        return new ServiceSchema({
            id: object.id,
            description: object.description,
            capacity: object.capacity,
            room: {
                name: object.room.name
            },
            instructors: instructors, 
            sessions: sessions
        });
    }
}