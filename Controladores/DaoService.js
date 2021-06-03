const mongoose = require("mongoose");
const { Schema } = mongoose;

const Dao = require("./DAO");

// const TempInstructorSchema = mongoose.model("InstructorTemp", new Schema({
//     email: {type: String, unique: true}
// }));

// const TempSessionSchema = mongoose.model("SessionTemp", new Schema({
//     id: {type: Number}
// }));

const ServiceSchema = mongoose.model("Service", new Schema ({
    id: {type: Number, index: true},
    description: {type: String},
    capacity: {type: Number},
    room: {
        name: {type: String, unique: true}
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
        const schema = this.toMongoSchema(object);
        return await schema.save();
    }

    async delete(filter) {
        return await ServiceSchema.remove(filter);
    }

    async modify(id, object){
        const schema = this.toMongoSchema(object);
        return await schema.save(id);
    }

    toMongoSchema(object) {
        const instructors1 = [];
        if (object.instructors.size > 0) {
            object.instructors.values().forEach(instructor => {
                instructors1.push({email: instructor.email});
            });
        }

        const sessions1 = [];
        if (object.sessions.size > 0) {
            object.sessions.values().forEach(session => {
                sessions1.push({id: session.id});
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