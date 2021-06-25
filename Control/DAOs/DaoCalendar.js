const mongoose = require("mongoose");
const { Schema } = mongoose;

const Dao = require("./DAO");

const DayTempSchema = new Schema ({
    number: {type: Number},
    name: {type: String}
}, { _id: false });

const NewSessionTempSchema = new Schema({
    startHour: {type: Number},
    endHour: {type: Number},
    session: {
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
        status: {type: String}
    }
});

const CalendarSchema = mongoose.model("Calendar", new Schema({
    room: {
        name: {type: String},
        schedule: {
            initialHour: {type: Number},
            totalHours: {type: Number}
        }
    },
    month: {type: Number},
    monthName: {type: String},
    year: {type: Number},
    days: [DayTempSchema],
    sessions: [{
        day: {type: Number},
        sessions1: [NewSessionTempSchema]
    }]
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
            name: object.room.name,
            schedule: {
                initialHour: object.room.schedule.initialHour,
                totalHours: object.room.schedule.totalHours
            }
        };
        schema.month = object.month;
        schema.monthName = object.monthName;
        schema.year = object.year;


        const sessions1 = [];
        object.sessions.forEach((daySchedule, key) => {
            // daySchedule es un Map.
            // Key: {startHour, endHour}
            // Value: [session]
            const sessions2 = [];
            daySchedule.forEach((value, key) => {
                if (value.length > 0) {
                    const schema1 = {
                        startHour: key.startHour,
                        endHour: key.endHour,
                        session: {
                            instructor: {
                                id: value[0].instructor.id,
                                firstName: value[0].instructor.firstName,
                                lastName: value[0].instructor.lastName
                            },
                            service: {
                                name: value[0].service.name,
                                capacity: value[0].service.capacity,
                            },
                            capacity: value[0].capacity,
                            schedule: {
                                month: value[0].schedule.month,
                                day: value[0].schedule.day
                            },
                            status: value[0].status
                        }
                    };
                } else {
                    const schema1 = {
                        startHour: key.startHour,
                        endHour: key.endHour,
                        session: {
                            status: "Free Space"
                        }
                    };
                }
                
                sessions2.push(schema1);
            });
            const schema2 = {
                day: key,
                sessions1: sessions2
            };
            sessions1.push(schema2);
        });

        schema.sessions = sessions1;
        
        return await CalendarSchema.updateOne(filter, schema);
    }

    async getAll() {
        return await CalendarSchema.find({ });
    }

    toMongoSchema(object) {
        const days1 = [];
        object.days.forEach((day, dayNumber) => {
            const tempDay = { number: dayNumber, name: day };
            days1.push(tempDay);
        });

        const sessions1 = [];
        object.sessions.forEach((daySchedule, key) => {
            // daySchedule es un Map.
            // Key: {startHour, endHour}
            // Value: [session]
            const sessions2 = [];
            daySchedule.forEach((value, key) => {
                const schema1 = {
                    startHour: key.startHour,
                    endHour: key.endHour,
                    session: {
                        status: "Free Space"
                    }
                };
                sessions2.push(schema1);
            });
            const schema2 = {
                day: key,
                sessions1: sessions2
            };
            sessions1.push(schema2);
        });

        return new CalendarSchema({
            room: {
                name: object.room.name,
                schedule: {
                    initialHour: object.room.schedule.initialHour,
                    totalHours: object.room.schedule.totalHours
                }
            },
            month: object.month,
            monthName: object.monthName,
            year: object.year,
            days: days1,
            sessions: sessions1
        });
    }
}