const Service = require("../Modelo/Service");
const Controller = require("./Controller");

module.exports = class ControlService extends Controller {
    constructor(handler){
        super(handler);
    }

    async save(object) {
        const service = new Service (
            object.description,
            object.capacity,
            object.room,
            object.instructor
        );
        return await this.handler.save(service);
    }

    async modify(filter, object) {
        return await this.handler.modify(filter, object);
    }
}