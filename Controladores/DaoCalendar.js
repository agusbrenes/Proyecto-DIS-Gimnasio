const mongoose = require("mongoose");
const { Schema } = mongoose;

const Dao = require("./DAO");

const DayTempSchema = new Schema ({
    number: {type: Number},
    name: {type: String}
});

const CalendarSchema = mongoose.model("Calendar", new Schema({
    room: {
        name: {type: String}
    },
    month: {type: Number},
    monthName: {type: String},
    year: {type: Number},
    days: [DayTempSchema]
}));

module.exports = class DaoCalendar extends Dao {
    async find(filter) {
        return await CalendarSchema.find(filter);
    }

    async save(object) {
        const schema = this.toMongoSchema(object);
        return await schema.save();
    }

    async delete(filter) {
        return await CalendarSchema.remove(filter);
    }

    async modify(id, object){
        const schema = this.toMongoSchema(object);
        return await schema.save(id);
    }

    async getAll() {
        return await CalendarSchema.find({ });
    }

    toMongoSchema(object) {
        const days1 = [];

        if (object.days.length > 0) {
            object.days.values().forEach(day => {
                const tempDay = new DayTempSchema({
                    number: day.number,
                    name: day.name
                });
    
                days1.push(tempDay);
            });
        }

        return new CalendarSchema({
            room: {
                name: object.room.name
            },
            month: object.month,
            monthName: object.monthName,
            year: object.year,
            days: days1
        });
    }
}