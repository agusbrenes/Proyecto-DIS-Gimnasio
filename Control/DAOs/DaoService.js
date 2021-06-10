const mongoose = require("mongoose");
const { Schema } = mongoose;

const Dao = require("./DAO");

const TempInstructorSchema = new Schema({
    id: {type: Number}
}, { _id: false });

const TempSessionSchema = new Schema({
    id: {type: Number}
}, { _id: false });

const ServiceSchema = mongoose.model("Service", new Schema ({
    id: {type: Number, index: true},
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
        return await ServiceSchema.find(filter);
    }

    async save(object) {
        const schema = this.toMongoSchema(object);
        return await schema.save();
    }

    async delete(filter) {
        return await ServiceSchema.remove(filter);
    }

    async modify(filter, object){
        const schema = ServiceSchema.findOne(filter);

        schema.id = object.id;
        schema.description = object.description;
        schema.capacity = object.capacity;
        schema.room.name = object.room.name;

        const instructors1 = [];
        if (object.instructors.length > 0) {
            object.instructors.forEach(instructor => {
                const schema1 = { id: instructor.id };
                instructors1.push(schema1);
            });
            schema.instructors = instructors1;
        }

        const sessions1 = [];
        if (object.sessions.length > 0) {
            object.sessions.forEach(session => {
                const schema1 = { id: session.id };
                sessions1.push(schema1);
            });
            schema.sessions = sessions1;
        }

        return await ServiceSchema.updateOne(filter, schema);
    }

    async getAll() {
        return await ServiceSchema.find({ });
    }

    toMongoSchema(object) {
        const instructors1 = [];
        if (object.instructors.length > 0) {
            object.instructors.forEach(instructor => {
                const schema = { id: instructor.id };
                instructors1.push(schema);
            });
        }

        const sessions1 = [];
        if (object.sessions.length > 0) {
            object.sessions.forEach(session => {
                const schema = { id: session.id };
                sessions1.push(schema);
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