const mongoose = require("mongoose");
const { Schema } = mongoose;

const Dao = require("./DAO");

const TempAdminSchema = new Schema({
    email: {type: String, unique: true}
});

const TempInstructorSchema = new Schema({
    email: {type: String, unique: true}
});

const TempServiceSchema = new Schema({
    id: {type: Number, unique: true}
});

const TempCalendarSchema = new Schema({
    month: {type: Number, required: true},
    year: {type: Number, required: true}
});

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
        return await RoomSchema.findOne(filter);
    }

    async save(object) {
        const schema = this.toMongoSchema(object);
        return await schema.save();
    }

    async delete(filter) {
        return await RoomSchema.remove(filter);
    }

    async modify(id, object) {
        const schema = this.toMongoSchema(object);
        return await schema.save(id);
    }

    async getAll() {
        return await RoomSchema.find({ });
    }

    toMongoSchema(object) {
        const administrators1 = [];
        if (object.administrators.size > 0) {
            object.administrators.values().forEach(administrator => {
                const schema = new TempAdminSchema({
                    email: administrator.email
                });
                administrators1.push(schema);
            });
        }

        const instructors1 = [];
        if (object.instructors.size > 0) {
            object.instructors.values().forEach(instructor => {
                const schema = new TempInstructorSchema({
                    email: instructor.email
                });
                instructors1.push(schema);
            });
        }

        const services1 = [];
        if (object.services.size > 0) {
            object.services.values().forEach(service => {
                const schema = TempServiceSchema({
                    id: service.id
                });
                services1.push(schema);
            });
        }   

        const calendars1 = [];
        if (object.calendars.size > 0) {
            object.calendars.values().forEach(calendar => {
                const schema = TempCalendarSchema({
                    month: calendar.month,
                    year: calendar.year
                });
                calendars1.push(schema);
            });
        }

        return new RoomSchema({
            name: object.name,
            maxCapacity: object.max_capacity,
            capacity: object.capacity,
            schedule: {
                id: object.schedule.id
            },
            administrators = administrators1,
            instructors: instructors1,
            services: services1,
            calendars: calendars1
        });
    }
}