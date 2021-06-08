const mongoose = require("mongoose");
const { Schema } = mongoose;

const Dao = require("./DAO");

const TempAdminSchema = mongoose.Schema({
    id: {type: Number, unique: true}
});

const TempInstructorSchema = new Schema({
    id: {type: Number, unique: true}
}, { _id: false });

const TempServiceSchema = new Schema({
    id: {type: Number, unique: true}
}, { _id: false });

const TempCalendarSchema = new Schema({
    month: {type: Number, required: true},
    year: {type: Number, required: true}
}, { _id: false });

const RoomSchema = mongoose.model("Room", new Schema({
    name: {type: String, index: true},
    maxCapacity: {type: Number, required: true},
    capacity: {type: Number},
    schedule: {
        id: {type: Number, required: true}
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
        const schema = RoomSchema.findOne(filter);

        schema.name = object.name;
        schema.maxCapacity = object.maxCapacity;
        schema.capacity = object.capacity;
        schema.schedule.id = object.schedule.id;

        const administrators1 = [];
        if (object.administrators.length > 0) {
            object.administrators.forEach(administrator => {
                const schema1 = new TempAdminSchema({
                    id: administrator.id
                });
                administrators1.push(schema1);
            });
            schema.administrators = administrators1;
        }

        const instructors1 = [];
        if (object.instructors.length > 0) {
            object.instructors.forEach(instructor => {
                const schema1 = new TempInstructorSchema({
                    id: instructor.id
                });
                instructors1.push(schema1);
            });
            schema.instructors = instructors1;
        }

        const services1 = [];
        if (object.services.length > 0) {
            object.services.forEach(service => {
                const schema1 = TempServiceSchema({
                    id: service.id
                });
                services1.push(schema1);
            });
            schema.services = services1;
        }   

        const calendars1 = [];
        if (object.calendars.length > 0) {
            object.calendars.forEach(calendar => {
                const schema1 = TempCalendarSchema({
                    month: calendar.month,
                    year: calendar.year
                });
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
                const schema = new TempAdminSchema({
                    id: administrator.id
                });
                administrators1.push(schema);
            });
        }

        const instructors1 = [];
        if (object.instructors.length > 0) {
            object.instructors.forEach(instructor => {
                const schema = new TempInstructorSchema({
                    id: instructor.id
                });
                instructors1.push(schema);
            });
        }

        const services1 = [];
        if (object.services.length > 0) {
            object.services.forEach(service => {
                const schema = TempServiceSchema({
                    id: service.id
                });
                services1.push(schema);
            });
        }   

        const calendars1 = [];
        if (object.calendars.length > 0) {
            object.calendars.forEach(calendar => {
                const schema = TempCalendarSchema({
                    month: calendar.month,
                    year: calendar.year
                });
                calendars1.push(schema);
            });
        }

        return new RoomSchema({
            name: object.name,
            maxCapacity: object.maxCapacity,
            capacity: object.capacity,
            schedule: {
                id: object.schedule.id
            },
            administrators: administrators1,
            instructors: instructors1,
            services: services1,
            calendars: calendars1
        });
    }
}