const Room = require('../../Modelo/Room');
const Controller = require("./Controller");

const DaoRoom = require('../Daos/DaoRoom');
const ControlAdmin = require('./ControlAdmin');

module.exports = class ControlRoom extends Controller {
    constructor() {
        super(new DaoRoom());
    }

    async toObject(schema) {
        const controlAdmin = new ControlAdmin();
        
        const adminQuery = await controlAdmin.find({id: schema.admin.id});
        const admin = await controlAdmin.toObject(adminQuery[0]);
        let room = new Room (
            schema.name, 
            schema.maxCapacity, 
            schema.capacity, 
            admin, 
            schema.beginTime, 
            schema.endTime
        );
        room = await this.setRoomInstructors(room, schema.instructors);
        room = await this.setRoomServices(room, schema.services);
        room = await this.setRoomCalendars(room, schema.calendars);
        return room;
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

    // Setear
}