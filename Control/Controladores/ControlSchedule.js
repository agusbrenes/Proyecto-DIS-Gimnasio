const Controller = require("./Controller");
const Schedule = require("../../Modelo/Schedule");

const DaoSchedule = require('../DAOs/DaoSchedule');

module.exports = class ControlSchedule extends Controller {
    constructor() {
        super(new DaoSchedule());
    }

    async save(object) {
        const schedule = new Schedule (
            object.beginTime, 
            object.endTime
        );
        return await this.handler.save(schedule);
    }

    toObject(schema) {
        const schedule = new Schedule (
            schema.beginTime,
            schema.endTime
        );
        schedule.setId(schema.id);
        return schedule;
    }
}