const Controller = require("./Controller");
const Schedule = require("../../Modelo/Schedule");

const DaoSchedule = require('../DAOs/DaoSchedule');

module.exports = class ControlSchedule extends Controller {
    constructor() {
        super(new DaoSchedule());
    }

    async save(object) {
        const schedule = new Schedule(
            object.month, 
            object.day, 
            object.initialHour, 
            object.totalHours
        );
        return await this.handler.save(schedule);
    }

    toObject(schema) {
        const schedule = new Schedule(
            schema.month, 
            schema.day, 
            schema.initialHour, 
            schema.totalHours
        );
        return schedule;
    }
}