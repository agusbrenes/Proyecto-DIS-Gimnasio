const mongoose = require("mongoose");
const { Schema } = mongoose;

const Dao = require("./DAO");

const ScheduleSchema = mongoose.model("Schedule", new Schema({
    initialHour: {type: Date, required: true},
    totalHours: {type: Number},
    month: {type: Number},
    day: {type: Number}
}));

module.exports = class DaoSchedule extends Dao {
    async find(filter) {
        return await ScheduleSchema.find(filter);
    }

    async save(object) {
        const schema = this.toMongoSchema(object);
        return await schema.save();
    }

    async delete(filter) {
        return await ScheduleSchema.remove(filter);
    }

    async modify(filter, object) {
        const schema = await ScheduleSchema.findOne(filter);

        schema.initialHour = object.initialHour;
        schema.totalHours = object.totalHours;
        schema.month = object.month;
        schema.day = object.day;

        return await ScheduleSchema.updateOne(filter, schema);
    }

    async getAll() {
        return await ScheduleSchema.find({ });
    }

    toMongoSchema(object) {
        return new ScheduleSchema({
            initialHour: object.initialHour,
            totalHours: object.totalHours,
            month: object.month,
            day: object.day
        });
    }
}