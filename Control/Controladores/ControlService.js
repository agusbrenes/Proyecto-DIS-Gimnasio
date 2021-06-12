const Service = require("../../Modelo/Service");
const Controller = require("./Controller");

const DaoService = require("../DAOs/DaoService");
const ControlRoom = require("./ControlRoom");
const ControlInstructor = require("./ControlInstructor");
const ControlSession = require("./ControlSession");

module.exports = class ControlService extends Controller {
    constructor() {
        super(new DaoService());
    }

    async save(object) {
        const service = new Service (
            object.name,
            object.room,
            object.instructor
        );
        return await this.handler.save(service);
    }

    async toObject(schema) {
        const controlInstructor = new ControlInstructor();        
        const controlRoom = new ControlRoom();

        const roomQuery = await controlRoom.find({room: schema.room.name});
        const room = await controlRoom.toObject(roomQuery[0]);
        const instructorQuery = await controlInstructor.find({id: schema.instructor.id});
        const instructor = await controlInstructor.toObject(instructorQuery[0]);

        let service = new Service (
            schema.name,
            room,
            instructor
        );
        service.setId(schema.id);
        service = await this.setServiceInstructors(service, schema.instructors);
        service = await this.setServiceSessions(service, schema.sessions);
        return service;
    }

    async setServiceInstructors(service, instructorArray) {
        const control = new ControlInstructor();
        for (var i = 0; i < instructorArray.length; i++) {
            const instructorQuery = await control.find(instructorArray[i]);
            const instructor = control.toObject(instructorQuery[0]);
            service.addReservation(instructor);
        }
        return service;
    }

    async setServiceSessions(service, sessionArray) {
        const control = new ControlSession();
        for (var i = 0; i < sessionArray.length; i++) {
            const sessionQuery = await control.find(sessionArray[i]);
            const session = control.toObject(sessionQuery[0]);
            service.addReservation(session);
        }
        return service;
    }
}