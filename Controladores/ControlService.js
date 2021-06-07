const Service = require("../Modelo/Service");
const Controller = require("./Controller");
const DaoService = require("./DaoService");

module.exports = class ControlService extends Controller {
    constructor() {
        super(new DaoService());
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
}