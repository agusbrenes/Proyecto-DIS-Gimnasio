const Room = require('../../Modelo/Room');
const Controller = require("./Controller");

const DaoRoom = require('../Daos/DaoRoom');

module.exports = class ControlRoom extends Controller {
    constructor() {
        super(new DaoRoom());
    }

    async toObject(schema, controlAdmin, controlSession, controlInstructor, controlService) {
        //console.log("Schema Room ", schema);
        const adminQuery = await controlAdmin.find({id: schema.administrators[0].id});
        const admin = await controlAdmin.toAuxObject(adminQuery[0], controlSession, controlInstructor, controlService, this);
        let room = new Room (
            schema.name, 
            schema.maxCapacity, 
            schema.capacity, 
            admin, 
            schema.initialHour, 
            schema.totalHours
        );
        room = await this.setRoomInstructors(room, schema.instructors);
        room = await this.setRoomServices(room, schema.services);
        room = await this.setRoomCalendars(room, schema.calendars);
        return room;
    }

    async toAuxObject(schema, controlAdmin, controlSession, controlInstructor, controlService) {
        //console.log("Schema Room Aux", schema, controlAdmin);
        const administator = schema.administrators[0];
        const adminQuery = await controlAdmin.find({id: administator.id});
        const admin = await controlAdmin.toAuxObject(adminQuery[0], controlSession, controlInstructor, controlService, this);
        let room = new Room (
            schema.name, 
            schema.maxCapacity, 
            schema.capacity, 
            admin, 
            schema.schedule.initialHour, 
            schema.schedule.totalHours
        );
        return room;
    }

    async save(object) {
        const room = new Room (
            object.name, 
            object.maxCapacity, 
            object.capacity, 
            object.administrator, 
            object.schedule.initialHour, 
            object.schedule.totalHours
        );
        return await this.handler.save(room);
    }

    async setRoomInstructors(room, control, instructorArray) {
        for (var i = 0; i < instructorArray.length; i++) {
            const instructorQuery = await control.find(instructorArray[i]);
            const instructor = control.toAuxObject(instructorQuery[0]);
            room.addInstructor(instructor);
        }
        return room;
    }

    async setRoomServices(room, control, serviceArray) {
        for (var i = 0; i < serviceArray.length; i++) {
            const serviceQuery = await control.find(serviceArray[i]);
            const service = control.toAuxObject(serviceQuery[0]);
            room.addService(service);
        }
        return room;
    }

    async setRoomCalendars(room, control, calendarArray) {
        for (var i = 0; i < calendarArray.length; i++) {
            const calendarQuery = await control.find(calendarArray[i]);
            const calendar = control.toAuxObject(calendarQuery[0]);
            room.addService(calendar);
        }
        return room;
    }
}