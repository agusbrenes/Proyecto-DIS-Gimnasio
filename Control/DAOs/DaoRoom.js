const mongoose = require("mongoose");
const { Schema } = mongoose;

const Dao = require("./DAO");

const TempAdminSchema = new Schema({
    id: {type: String},
    firstName: {type: String},
    lastName: {type: String}
}, { _id: false });

const TempInstructorSchema = new Schema({
    id: {type: Number},
    firstName: {type: String},
    lastName: {type: String}
}, { _id: false });

const TempServiceSchema = new Schema({
    name: {type: String}
}, { _id: false });

const TempCalendarSchema = new Schema({
    month: {type: Number, required: true},
    year: {type: Number, required: true}
}, { _id: false });

//En el calendar meter el filtro como dato para poder consultarlo despues del schema de calendar.

const RoomSchema = mongoose.model("Room", new Schema({
    name: {type: String, index: true},
    maxCapacity: {type: Number, required: true},
    capacity: {type: Number},
    schedule: {
        initialHour: {type: Number},
        totalHours: {type: Number}
    },
    administrators: [TempAdminSchema],
    instructors: [TempInstructorSchema],
    services: [TempServiceSchema],
    calendars: [TempCalendarSchema]
}));

module.exports = class DaoRoom extends Dao {
    async find(filter) {
        return await RoomSchema.find(filter);
    }

    async save(object) {
        const schema = this.toMongoSchema(object);
        return await schema.save();
    }

    async delete(filter) {
        return await RoomSchema.remove(filter);
    }

    async modify(filter, object) {
        const schema = await RoomSchema.findOne(filter);

        schema.name = object.name;
        schema.maxCapacity = object.maxCapacity;
        schema.capacity = object.capacity;
        schema.schedule = {
            initialHour: object.schedule.initialHour, 
            totalHours: object.schedule.totalHours,
            month: object.schedule.month,
            day: object.schedule.day
        };

        const administrators1 = [];
        if (object.administrators.length > 0) {
            object.administrators.forEach(administrator => {
                const schema1 = { 
                    id: administrator.id, 
                    firstName: administrator.firstName, 
                    lastName: administrator.lastName 
                };
                administrators1.push(schema1);
            });
            schema.administrators = administrators1;
        }

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

        const services1 = [];
        if (object.services.length > 0) {
            object.services.forEach(service => {
                const schema1 = { 
                    name: service.name 
                };
                services1.push(schema1);
            });
            schema.services = services1;
        }   

        const calendars1 = [];
        if (object.calendars.length > 0) {
            object.calendars.forEach(calendar => {
                const schema1 = { 
                    month: calendar.month, 
                    year: calendar.year 
                };
                calendars1.push(schema1);
            });
            schema.calendars = calendars1;
        }

        return await RoomSchema.updateOne(filter, schema);
    }

    async getAll() {
        return await RoomSchema.find({ });
    }

    toMongoSchema(object) {
        const administrators1 = [];
        if (object.administrators.length > 0) {
            object.administrators.forEach(administrator => {
                const schema = { 
                    id: administrator.id, 
                    firstName: administrator.firstName, 
                    lastName: administrator.lastName 
                };
                administrators1.push(schema);
            });
        }

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

        const services1 = [];
        if (object.services.length > 0) {
            object.services.forEach(service => {
                const schema = { 
                    name: service.name 
                };
                services1.push(schema);
            });
        }   

        const calendars1 = [];
        if (object.calendars.length > 0) {
            object.calendars.forEach(calendar => {
                const schema = { 
                    month: calendar.month, 
                    year: calendar.year 
                };
                calendars1.push(schema);
            });
        }

        return new RoomSchema({
            name: object.name,
            maxCapacity: object.maxCapacity,
            capacity: object.capacity,
            schedule: {
                initialHour: object.schedule.initialHour,
                totalHours: object.schedule.totalHours,
                month: object.schedule.month,
                day: object.schedule.day
            },
            administrators: administrators1,
            instructors: instructors1,
            services: services1,
            calendars: calendars1
        });
    }
}