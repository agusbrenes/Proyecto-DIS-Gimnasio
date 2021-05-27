const mongoose = require("mongoose");
const { Schema } = mongoose;

const Dao = require("./DAO");

const ServiceSchema = mongoose.model("Service", new Schema ({
    id: {type: Integer},
    description: {type: String},
    capacity: {type: Integer},
    room: {
        name: {type: String}
    },
    instructors: [{
        id: {type: String},
        email: {type: String}
    }],
    sessions: [{
        id: {type: Integer}
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
        return new ServiceSchema({
            id: object.id,
            description: object.description,
            capacity: object.capacity,
            room: {
                name: object.room.name
            },
            instructors: [], //TODO: pending this
            sessions: [] //TODO: pending this
        });
    }
}