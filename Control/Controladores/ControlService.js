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

    async toObject(schema, controlInstructor, controlRoom, controlAdmin, controlSession) {
        const roomQuery = await controlRoom.find({name: schema.room.name});
        const room = await controlRoom.toAuxObject(roomQuery[0], controlAdmin, controlSession, controlInstructor, this);
        
        const instruc = schema.instructors[0];
        const instructorQuery = await controlInstructor.find({id: instruc.id});
        const instructor = await controlInstructor.toAuxObject(instructorQuery[0], controlRoom, controlAdmin, controlSession, this);

        let service = new Service (
            schema.name,
            room,
            instructor
        );
        service = await this.setServiceInstructors(service, schema.instructors, controlInstructor, controlRoom, controlAdmin, controlSession); //
        service = await this.setServiceSessions(service, schema.sessions, controlSession, controlInstructor, controlRoom, controlAdmin); //
        return service;
    }

    async toAuxObject(schema, controlInstructor, controlRoom, controlAdmin, controlSession) {
        const roomQuery = await controlRoom.find({name: schema.room.name});
        const room = await controlRoom.toAuxObject(roomQuery[0], controlAdmin, controlSession, controlInstructor, this);
        
        const instruc = schema.instructors[0];
        const instructorQuery = await controlInstructor.find({id: instruc.id});
        const instructor = await controlInstructor.toAuxObject(instructorQuery[0], controlRoom, controlAdmin, controlSession, this);

        let service = new Service (
            schema.name,
            room,
            instructor
        );
        return service;
    }

    async setServiceInstructors(service, instructorArray, controlInstructor, controlRoom, controlAdmin, controlSession) { 
        for (var i = 0; i < instructorArray.length; i++) {
            const instructorQuery = await controlInstructor.find(instructorArray[i]);
            const instructor = await controlInstructor.toAuxObject(instructorQuery[0], controlRoom, controlAdmin, controlSession, this);
            service.addInstructor(instructor);
        }
        return service;
    }

    async setServiceSessions(service, sessionArray, controlSession, controlInstructor, controlRoom, controlAdmin) {
        for (var i = 1; i < sessionArray.length; i++) {
            const sessionQuery = await controlSession.find(sessionArray[i]); // query da vacio, undefined abajo
            const session = await controlSession.toAuxObject(sessionQuery[0], controlInstructor, this, controlRoom, controlAdmin); //
            service.addSession(session);
        }
        return service;
    }
}