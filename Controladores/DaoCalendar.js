const mongoose = require("mongoose");
const { Schema } = mongoose;

const Dao = require("./DAO");

const DayTempSchema = mongoose.model("DayTemp", new Schema ({
    number: {type: Number},
    name: {type: String}
}));

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
        return await CalendarSchema.findOne(filter);
    }

    async save(object) {
        const schema = this.toMongoSchema(object);
        return await schema.save();
    }

    delete() {
        throw new Error("Abstract Method has no implementation");
    }

    modify(){
        throw new Error("Abstract Method has no implementation");
    }

    toMongoSchema(object) {
        const days1 = [];

        //Experimental, might not work
        object.days.values().forEach(day => {
            const tempDay = new DayTempSchema({
                number: day.number,
                name: day.name
            });

            days1.push(tempDay);
        });

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