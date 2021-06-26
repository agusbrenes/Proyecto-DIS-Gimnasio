const mongoose = require("mongoose");
const { Schema } = mongoose;

const Dao = require("./DAO");

const NewSessionTempSchema = new Schema({
    startHour: {type: Number},
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
}, { _id: false });

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
            schedule: {
                initialHour: object.room.schedule.initialHour,
                totalHours: object.room.schedule.totalHours
            },
            name: object.room.name
        };
        schema.month = object.month;
        schema.monthName = object.monthName;
        schema.year = object.year;

        const newSessions = [];
        object.sessions.forEach((daySchedule, dayNum) => {
            //daySchedule es un Map con:
                //Key: startHour (int)
                //Value: [session]
            
            const tempArray = [];
            daySchedule.forEach((element, key) => {
                
                var innerMapElement = {};
                if (element.length > 0) {
                    innerMapElement = {
                        startHour: key,
                        session: {
                            instructor: {
                                id: element.instructor.id, 
                                firstName: element.instructor.firstName, 
                                lastName: element.instructor.lastName
                            },
                            service: {
                                name: element.service.name,
                                capacity: element.service.capacity
                            },
                            capacity: element.capacity,
                            schedule: {
                                month: element.schedule.month,
                                day: element.schedule.day
                            },
                            status: element.status
                        }
                    };
                } else {
                    innerMapElement = {
                        startHour: key,
                        session: {
                            status: "Free Space"
                        }
                    };
                }

                tempArray.push(innerMapElement);
            });

            const outerMapElement = {
                day: dayNum,
                sessions1: tempArray
            };

            newSessions.push(outerMapElement);
        });

        schema.sessions = newSessions;
        
        return await CalendarSchema.updateOne(filter, schema);
    }

    async getAll() {
        return await CalendarSchema.find({ });
    }

    toMongoSchema(object) {
        const newSessions = [];
        object.sessions.forEach((daySchedule, key) => {
            // daySchedule es un Map.
            // Key: startHour
            // Value: [session]
            const tempArray = [];
            daySchedule.forEach((value, key) => {
                const innerMapElement = {
                    startHour: key,
                    session: {
                        status: "Free Space"
                    }
                };
                tempArray.push(innerMapElement);
            });
            const outerMapElement = {
                day: key,
                sessions1: tempArray
            };
            newSessions.push(outerMapElement);
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
            sessions: newSessions
        });
    }
}