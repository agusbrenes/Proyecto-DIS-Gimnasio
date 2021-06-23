const mongoose = require("mongoose");
const { Schema } = mongoose;

const Dao = require("./DAO");

const DayTempSchema = new Schema ({
    number: {type: Number},
    name: {type: String}
}, { _id: false });

const SessionTempSchema = new Schema({
    instructor: {
        id: {type: Number},
        firstName: {type: String},
        lastName: {type: String}
    },
    service: {
        name: {type: String},
        capacity: {type: Number}
    },
    capacity: {type: Number},
    schedule: {
        month: {type: Number},
        day: {type: Number}
    },
    plan: {
        initialHour: {type: Number},
        totalHours: {type: Number}
    },
    status: {type: String}
}, { _id: false });

const CalendarSchema = mongoose.model("Calendar", new Schema({
    room: {
        name: {type: String}
    },
    month: {type: Number},
    monthName: {type: String},
    year: {type: Number},
    days: [DayTempSchema],
    sessions: [SessionTempSchema]
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
        if (object.days.length > 0) {
            object.days.forEach(day => {
                const schema1 = { 
                    number: day.number, 
                    name: day.name 
                };
                days1.push(schema1);
            });
            schema.days = days1;
        }

        const sessions1 = [];
        if (object.sessions.length > 0) {
            object.sessions.forEach(session => {
                const schema1 = {
                    instructor: {
                        id: session.instructor.id,
                        firstName: session.instructor.firstName,
                        lastName: session.instructor.lastName
                    },
                    service: {
                        name: session.service.name,
                        capacity: session.service.capacity
                    },
                    capacity: session.capacity,
                    schedule: {
                        month: session.schedule.month,
                        day: session.schedule.day
                    },
                    plan: {
                        initialHour: session.plan.initialHour,
                        totalHours: session.plan.totalHours
                    },
                    status: session.status
                }
                sessions1.push(schema1);
            });
            schema.sessions = sessions1;
        }
        
        return await CalendarSchema.updateOne(filter, schema);
    }

    async getAll() {
        return await CalendarSchema.find({ });
    }

    toMongoSchema(object) {
        const days1 = [];

        if (object.days.length > 0) {
            object.days.forEach(day => {
                const tempDay = { number: day.number, name: day.name };
                days1.push(tempDay);
            });
        }

        const sessions1 = [];
        if (object.sessions.length > 0) {
            object.sessions.forEach(session => {
                const schema1 = {
                    instructor: {
                        id: session.instructor.id,
                        firstName: session.instructor.firstName,
                        lastName: session.instructor.lastName
                    },
                    service: {
                        description: session.service.description,
                        roomCapacity: session.service.roomCapacity
                    },
                    capacity: session.capacity,
                    schedule: {
                        month: session.schedule.month,
                        day: session.schedule.day
                    },
                    plan: {
                        initialHour: session.plan.initialHour,
                        totalHours: session.plan.totalHours
                    },
                    status: session.status
                }
                sessions1.push(schema1);
            });
        }

        return new CalendarSchema({
            room: {
                name: object.room.name
            },
            month: object.month,
            monthName: object.monthName,
            year: object.year,
            days: days1,
            sessions: sessions1
        });
    }
}