const mongoose = require("mongoose");
const { Schema } = mongoose;

const Dao = require("./DAO");

const TempCalendarSchema = new Schema({
    month: {type: Number},
    year: {type: Number}
});

const TempSessionSchema = new Schema({
    id: {type: Number}
});

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
        return await DaySchema.findOne(filter);
    }

    async save(object) {
        const schema = this.toMongoSchema(object);
        return await schema.save();
    }

    async delete(filter) {
        return await DaySchema.remove(filter);
    }

    async modify(id, object) {
        const schema = this.toMongoSchema(object);
        return await schema.save(id);
    }

    async getAll() {
        return await DaySchema.find({ });
    }

    toMongoSchema(object) {
        calendars1 = [];
        object.calendars.values().forEach(calendar => {
            const tempCalendar = new TempCalendarSchema({
                month: calendar.month,
                year: calendar.year
            });
            calendars1.push(tempCalendar);
        });

        sessions1 = [];
        object.sessions.values().forEach(session => {
            const tempSession = new TempSessionSchema({
                id: session.id
            });
            sesssions1.push(tempSession);
        });

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