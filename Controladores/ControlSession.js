const Session = require("../Modelo/Session");
const Controller = require("./Controller");

const DaoSession = require("./DAOs/DaoSession");

module.exports = class ControlSession extends Controller {
    constructor() {
        super(new DaoSession());
    }

    async save(object) {
        const session = new Session (
            object.instructor,
            object.service,
            object.capacity,
            object.day,
            object.beginTime, 
            object.endTime
        );
        return await this.handler.save(session);
    }
}