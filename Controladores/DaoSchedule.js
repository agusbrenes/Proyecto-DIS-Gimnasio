const mongoose = require("mongoose");
const { Schema } = mongoose;

const Dao = require("./DAO");

const ScheduleSchema = mongoose.model("Schedule", new Schema({
    id: {type: Number, index: true},
    beginTime: {type: Date, required: true},
    endTime: {type: Date, required: true}
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
        const schema = ScheduleSchema.findOne(filter);

        schema.id = object.id;
        schema.beginTime = object.begin_time;
        schema.endTime = object.end_time;

        return await ScheduleSchema.updateOne(filter, schema);
    }

    async getAll() {
        return await ScheduleSchema.find({ });
    }

    toMongoSchema(object) {
        return new ScheduleSchema({
            id: object.id,
            beginTime: object.begin_time,
            endTime: object.end_time
        });
    }
}