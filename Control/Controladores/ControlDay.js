const Controller = require("./Controller");
const ControlSchedule = require('./ControlSchedule');

const Day = require("../../Modelo/Day");

const DaoDay = require('../DAOs/DaoDay');

module.exports = class ControlDay extends Controller {
    constructor() {
        super(new DaoDay());
    }

    async save(object) {
        const day = new Day (
            object.number, 
            object.name, 
            object.schedule
        );
        return await this.handler.save(day);
    }

    async toObject(schema) {
        const controlSchedule = new ControlSchedule();

        const scheduleQuery = await controlSchedule.find({id: schema.schedule.id});
        const schedule = await controlSchedule.toAuxObject(scheduleQuery[0]);
        return new Day(
            schema.number,
            schema.name,
            schedule
        );
    }
}