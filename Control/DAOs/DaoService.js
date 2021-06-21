const mongoose = require("mongoose");
const { Schema } = mongoose;

const Dao = require("./DAO");

const TempInstructorSchema = new Schema({
    id: {type: Number},
    firstName: {type: String},
    lastName: {type: String}
}, { _id: false });

const TempSessionSchema = new Schema({
    instructor: {
        email: {type: String},
        firstName: {type: String},
        lastName: {type: String}
    }
}, { _id: false });

const ServiceSchema = mongoose.model("Service", new Schema ({
    description: {type: String, unique: true},
    room: {
        name: {type: String}
    },
    roomCapacity: {type: Number},
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
        const schema = await ServiceSchema.findOne(filter);

        schema.description = object.description;
        schema.room = {room: object.room.name};
        schema.roomCapacity = object.roomCapacity;

        const instructors1 = [];
        if (object.instructors.length > 0) {
            object.instructors.forEach(instructor => {
                const schema1 = { 
                    id: instructor.id, 
                    firstName: instructor.firstName, 
                    lastName: instructor.lastName 
                };
                instructors1.push(schema1);
            });
            schema.instructors = instructors1;
        }

        const sessions1 = [];
        if (object.sessions.length > 0) {
            object.sessions.forEach(session => {
                const schema1 = { 
                    instructor: {
                        email: session.instructor.email,
                        firstName: session.instructor.firstName,
                        lastName: session.instructor.lastName
                    }
                };
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
                const schema = { 
                    id: instructor.id, 
                    firstName: instructor.firstName, 
                    lastName: instructor.lastName 
                };
                instructors1.push(schema);
            });
        }

        const sessions1 = [];
        if (object.sessions.length > 0) {
            object.sessions.forEach(session => {
                const schema = { 
                    instructor: {
                        email: session.instructor.email,
                        firstName: session.instructor.firstName,
                        lastName: session.instructor.lastName
                    }
                };
                sessions1.push(schema);
            }); 
        }

        return new ServiceSchema({
            description: object.description,
            roomCapacity: object.roomCapacity,
            room: {
                name: object.room.name
            },
            instructors: instructors1, 
            sessions: sessions1
        });
    }
}