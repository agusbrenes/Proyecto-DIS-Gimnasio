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
        return await ScheduleSchema.findOne(filter);
    }

    async save(object) {
        const schema = this.toMongoSchema(object);
        return await schema.save();
    }

    async delete(filter) {
        return await ScheduleSchema.remove(filter);
    }

    async modify(id, object) {
        const schema = this.toMongoSchema(object);
        return await schema.save(id);
    }

    toMongoSchema(object) {
        return new ScheduleSchema({
            id: object.id,
            beginTime: object.begin_time,
            endTime: object.end_time
        });
    }
}