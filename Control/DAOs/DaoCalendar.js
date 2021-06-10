const mongoose = require("mongoose");
const { Schema } = mongoose;

const Dao = require("./DAO");

const DayTempSchema = new Schema ({
    number: {type: Number},
    name: {type: String}
}, { _id: false });

const CalendarSchema = mongoose.model("Calendar", new Schema({
    id: {type: Number, index: true},
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

    async modify(filter, object){
        const schema = await CalendarSchema.findOne(filter);

        schema.room = {
            name: object.room.name
        };
        schema.month = object.month;
        schema.monthName = object.monthName;
        schema.year = object.year;

        const days1 = [];
        if (object.days.values().length > 0) {
            object.days.values().forEach(day => {
                const schema1 = { number: day.number, name: day.name };
                days1.push(schema1);
            });
            schema.days = days1;
        }
        
        return await CalendarSchema.updateOne(filter, schema);
    }

    async getAll() {
        return await CalendarSchema.find({ });
    }

    toMongoSchema(object) {
        const days1 = [];

        if (object.days.values().length > 0) {
            object.days.values().forEach(day => {
                const tempDay = { number: day.number, name: day.name };
                days1.push(tempDay);
            });
        }

        return new CalendarSchema({
            id: object.id,
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