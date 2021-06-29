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
        id: {type: String},
        firstName: {type: String},
        lastName: {type: String}
    },
    schedule: {
        month: {type: Number},
        day: {type: Number}
    },
    plan: {
        initialHour: {type: Number},
        totalHours: {type: Number}
    }
}, { _id: false });

const ServiceSchema = mongoose.model("Service", new Schema ({
    name: {type: String, index: true},
    room: {
        name: {type: String},
        capacity: {type: Number}
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
        schema.room = {
            name: object.room.name,
            capacity: object.room.capacity
        };
        // schema.roomCapacity = object.roomCapacity;

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
                        id: session.instructor.id,
                        firstName: session.instructor.firstName,
                        lastName: session.instructor.lastName
                    },
                    schedule: {
                        month: session.schedule.month,
                        day: session.schedule.day
                    },
                    plan: {
                        initialHour: session.plan.initialHour,
                        totalHours: session.plan.totalHours
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
                        id: session.instructor.id,
                        firstName: session.instructor.firstName,
                        lastName: session.instructor.lastName
                    },
                    schedule: {
                        month: session.schedule.month,
                        day: session.schedule.day
                    },
                    plan: {
                        initialHour: session.plan.initialHour,
                        totalHours: session.plan.totalHours
                    }
                };
                sessions1.push(schema);
            }); 
        }

        return new ServiceSchema({
            name: object.name,
            room: {
                name: object.room.name,
                capacity: object.room.capacity
            },
            instructors: instructors1, 
            sessions: sessions1
        });
    }
}