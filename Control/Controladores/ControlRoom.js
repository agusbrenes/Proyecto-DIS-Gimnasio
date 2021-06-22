const Room = require('../../Modelo/Room');
const Controller = require("./Controller");

const DaoRoom = require('../Daos/DaoRoom');
const ControlAdmin = require('./ControlAdmin');
const ControlInstructor = require('./ControlInstructor');
const ControlService = require('./ControlService');
const ControlCalendar = require('./ControlCalendar');

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
            schema.initialHour, 
            schema.totalHours
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
            object.schedule.initialHour, 
            object.schedule.totalHours
        );
        return await this.handler.save(room);
    }

    async setRoomInstructors(room, instructorArray) {
        const control = new ControlInstructor();
        for (var i = 0; i < instructorArray.length; i++) {
            const instructorQuery = await control.find(instructorArray[i]);
            const instructor = control.toObject(instructorQuery[0]);
            room.addInstructor(instructor);
        }
        return room;
    }

    async setRoomServices(room, serviceArray) {
        const control = new ControlService();
        for (var i = 0; i < serviceArray.length; i++) {
            const serviceQuery = await control.find(serviceArray[i]);
            const service = control.toObject(serviceQuery[0]);
            room.addService(service);
        }
        return room;
    }

    async setRoomCalendars(room, calendarArray) {
        const control = new ControlCalendar();
        for (var i = 0; i < calendarArray.length; i++) {
            const calendarQuery = await control.find(calendarArray[i]);
            const calendar = control.toObject(calendarQuery[0]);
            room.addService(calendar);
        }
        return room;
    }
}