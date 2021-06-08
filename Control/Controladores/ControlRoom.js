const Room = require('../../Modelo/Room');
const Controller = require("./Controller");

const DaoRoom = require('../Daos/DaoRoom');

module.exports = class ControlRoom extends Controller {
    constructor() {
        super(new DaoRoom());
    }

    async save(object) {
        const room = new Room (
            object.name, 
            object.maxCapacity, 
            object.capacity, 
            object.administrator, 
            object.beginTime, 
            object.endTime
        );
        return await this.handler.save(room);
    }
}