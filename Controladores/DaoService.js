const mongoose = require("mongoose");
const { Schema } = mongoose;

const Dao = require("./DAO");

const TempInstructorSchema = mongoose.model("InstructorTemp", new Schema({
    email: {type: String, unique: true}
}));

const TempSessionSchema = mongoose.model("SessionTemp", new Schema({
    id: {type: Number}
}));

const ServiceSchema = mongoose.model("Service", new Schema ({
    id: {type: Number, unique: true},
    description: {type: String},
    capacity: {type: Number},
    room: {
        name: {type: String}
    },
    instructors: [TempInstructorSchema],
    sessions: [TempSessionSchema]
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
        const instructors1 = [];
        if (object.instructors.size > 0) {
            object.instructors.values().forEach(instructor => {
                const tempInstructor = new TempInstructorSchema({
                    email: instructor.email
                });
                instructors1.push(tempInstructor);
            });
        }

        const sessions1 = [];
        if (object.sessions.size > 0) {
            object.sessions.values().forEach(session => {
                const tempSession = new TempSessionSchema({
                    id: session.id
                });
                sessions1.push(tempSession);
            }); 
        }

        return new ServiceSchema({
            id: object.id,
            description: object.description,
            capacity: object.capacity,
            room: {
                name: object.room.name
            },
            instructors: instructors1, 
            sessions: sessions1
        });
    }
}