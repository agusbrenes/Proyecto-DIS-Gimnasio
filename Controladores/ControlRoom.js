const Room = require('../Modelo/Room');
const DaoRoom = require('./DaoRoom');

module.exports = class ControlRoom extends Controller {
    constructor() {
        super(new DaoRoom());
    }

    async save(object) {
        const room = new Room (
            object.name, 
            object.max_capacity, 
            object.capacity, 
            object.administrator, 
            object.beginTime, 
            object.endTime
        );
        return await this.handler.save(room);
    }
}