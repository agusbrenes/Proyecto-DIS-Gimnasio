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
        const room = await controlRoom.toAuxObject(roomQuery[0], controlAdmin);
        
        const instruc = schema.instructors[0];
        const instructorQuery = await controlInstructor.find({id: instruc.id});
        const instructor = await controlInstructor.toAuxObject(instructorQuery[0]);

        let service = new Service (
            schema.name,
            room,
            instructor
        );
        //console.log("CREA SERVICE", service);
        service = await this.setServiceInstructors(service, schema.instructors, controlInstructor); //
        //console.log("Instructor Aux agregado al Service:", service);
        service = await this.setServiceSessions(service, schema.sessions, controlSession, controlInstructor, controlRoom, controlAdmin); //
        //console.log("Session Aux agregado al Service:", service);
        return service;
    }

    async toAuxObject(schema, controlInstructor, controlRoom, controlAdmin) {
        const roomQuery = await controlRoom.find({name: schema.room.name});
        const room = await controlRoom.toAuxObject(roomQuery[0], controlAdmin);
        
        const instruc = schema.instructors[0];
        const instructorQuery = await controlInstructor.find({id: instruc.id});
        const instructor = await controlInstructor.toAuxObject(instructorQuery[0]);

        let service = new Service (
            schema.name,
            room,
            instructor
        );
        return service;
    }

    async setServiceInstructors(service, instructorArray, controlInstructor) {
        for (var i = 0; i < instructorArray.length; i++) {
            const instructorQuery = await controlInstructor.find(instructorArray[i]);
            const instructor = await controlInstructor.toAuxObject(instructorQuery[0]);
            service.addInstructor(instructor);
        }
        return service;
    }

    async setServiceSessions(service, sessionArray, controlSession, controlInstructor, controlRoom, controlAdmin) {
        //console.log("EnsetServiceSessions en ControlService", service, sessionArray)
        for (var i = 1; i < sessionArray.length; i++) {
            //console.log("sessionArray[",i,"]=",sessionArray[i]);
            const sessionQuery = await controlSession.find(sessionArray[i]); // query da vacio, undefined abajo
            //console.log("sessionQuery=",sessionQuery);
            const session = await controlSession.toAuxObject(sessionQuery[0], controlInstructor, this, controlRoom, controlAdmin); //
            //console.log("Sesion Aux creada en setServiceSessions", session);
            service.addSession(session);
        }
        return service;
    }
}