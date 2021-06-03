const Session = require("../Modelo/Session");
const Controller = require("./Controller");

module.exports = class ControlSession extends Controller {
    constructor(handler){
        super(handler);
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