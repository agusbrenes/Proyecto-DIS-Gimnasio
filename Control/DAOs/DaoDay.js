const mongoose = require("mongoose");
const { Schema } = mongoose;

const Dao = require("./DAO");

const TempCalendarSchema = new Schema({
    month: {type: Number},
    year: {type: Number}
}, { _id: false });

const TempSessionSchema = new Schema({
    id: {type: Number}
}, { _id: false });

const DaySchema = mongoose.model("Day", new Schema({
    number: {type: Number},
    name: {type: String},
    schedule: {
        id: {type: Number}
    },
    calendars: [TempCalendarSchema],
    sessions: [TempSessionSchema]
}));

module.exports = class DaoDay extends Dao {
    async find(filter) {
        return await DaySchema.find(filter);
    }

    async save(object) {
        const schema = this.toMongoSchema(object);
        return await schema.save();
    }

    async delete(filter) {
        return await DaySchema.remove(filter);
    }

    async modify(filter, object) {
        const schema = DaySchema.findOne(filter);

        schema.number = object.number;
        schema.name = object.name;
        schema.schedule.id = object.schedule.id;
        
        const calendars1 = [];
        if (object.calendars.length > 0) {
            object.calendars.values().forEach(calendar => {
                const tempCalendar = { month: calendar.month, year: calendar.year };
                calendars1.push(tempCalendar);
            });
            schema.calendars = calendars1;
        }

        const sessions1 = [];
        if (object.sessions.length > 0) {
            object.sessions.values().forEach(session => {
                const tempSession = { id: session.id };
                sesssions1.push(tempSession);
            });
            schema.sessions = sessions1;
        }

        return await DaySchema.updateOne(filter);
    }

    async getAll() {
        return await DaySchema.find({ });
    }

    toMongoSchema(object) {
        const calendars1 = [];
        if (object.calendars.length > 0) {
            object.calendars.values().forEach(calendar => {
                const tempCalendar = { month: calendar.month, year: calendar.year };
                calendars1.push(tempCalendar);
            });
        }

        const sessions1 = [];
        if (object.sessions.length > 0) {
            object.sessions.values().forEach(session => {
                const tempSession = { id: session.id };
                sesssions1.push(tempSession);
            });
        }

        return new DaySchema({
            number: object.number,
            name: object.name,
            schedule: {
                id: object.schedule.id
            },
            calendars: calendars1,
            sessions: sessions1
        });
    }
}