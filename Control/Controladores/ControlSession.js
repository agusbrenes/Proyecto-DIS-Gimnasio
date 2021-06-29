const Session = require("../../Modelo/Session");
const Controller = require("./Controller");

const DaoSession = require("../DAOs/DaoSession");
const ControlReservation = require("./ControlReservation"); // no se usa
const SessionRegisterAdmin = require("../../Modelo/SessionRegisterAdmin");
const SessionRegisterInstructor = require("../../Modelo/SessionRegisterInstructor");
const DaoService = require("../DAOs/DaoService");
const DaoCalendar = require("../Daos/DaoCalendar");

module.exports = class ControlSession extends Controller {
    constructor() {
        super(new DaoSession());
    }

    async save(object) {
        if (object.isAdmin) {
            var strategy = new SessionRegisterAdmin();
        } else {
            var strategy = new SessionRegisterInstructor();
        }
        const session = strategy.createSession(
            object.instructor,
            object.service,
            object.room,
            object.capacity,
            object.year,
            object.schedule.month,
            object.schedule.day,            
            object.plan.initialHour,
            object.plan.totalHours
        );
        return await this.handler.save(session);
    }
    
    async toObject(schema, controlInstructor, controlService, controlRoom, controlAdmin) {
        const instructorQuery = await controlInstructor.find({id: schema.instructor.id});
        const instructor = await controlInstructor.toAuxObject(instructorQuery[0], controlRoom, controlAdmin, this, controlService);

        const serviceQuery = await controlService.find({name: schema.service.name});
        const service = await controlService.toAuxObject(serviceQuery[0], controlInstructor, controlRoom, controlAdmin, this);

        const roomQuery = await controlRoom.find({name: schema.room.name});
        const room = await controlRoom.toAuxObject(roomQuery[0], controlAdmin, this, controlInstructor, controlService);    

        let session = new Session (
            instructor,
            service,
            room,
            schema.capacity,
            schema.year,
            schema.schedule.month,
            schema.schedule.day,            
            schema.plan.initialHour,
            schema.plan.totalHours,
            schema.status
        );
        session = await this.setSessionRoom(session, schema.room, controlRoom, controlAdmin, controlInstructor, controlService);
        session = await this.setSessionInstructor(session, schema.instructor, controlInstructor, controlRoom, controlAdmin, controlService);
        session = await this.setSessionService(session, schema.service, controlService, controlInstructor, controlRoom, controlAdmin);
        return session;
    }
    
    async toAuxObject(schema, controlInstructor, controlService, controlRoom, controlAdmin) {
        const instructorQuery = await controlInstructor.find({id: schema.instructor.id});
        const instructor = await controlInstructor.toAuxObject(instructorQuery[0], controlRoom, controlAdmin, this, controlService);

        const serviceQuery = await controlService.find({name: schema.service.name});
        const service = await controlService.toAuxObject(serviceQuery[0], controlInstructor, controlRoom, controlAdmin, this);

        const roomQuery = await controlRoom.find({name: schema.room.name});
        const room = await controlRoom.toAuxObject(roomQuery[0], controlAdmin, this, controlInstructor, controlService);      

        let session = new Session (
            instructor,
            service,
            room,
            schema.capacity,
            schema.year,
            schema.schedule.month,
            schema.schedule.day,            
            schema.plan.initialHour,
            schema.plan.totalHours,
            schema.status
        );
        return session;
    }

    // Yaa no se usa
    async setSessionReservations(session, reservationArray) {
        const control = new ControlReservation();
        for (var i = 0; i < reservationArray.length; i++) {
            const reservationQuery = await control.find(reservationArray[i]); 
            const reservation = await control.toAuxObject(reservationQuery[0]);
            session.addReservation(reservation);
        }
        return session;
    }
    
    async setSessionRoom(session, sessionRoom, controlRoom, controlAdmin, controlInstructor, controlService) {
        const roomQuery = await controlRoom.find({name: sessionRoom.name});
        const room = await controlRoom.toAuxObject(roomQuery[0], controlAdmin, this, controlInstructor, controlService);

        session.setRoom(room);
        return session;
    }
    
    async setSessionInstructor(session, sessionInstructor, controlInstructor, controlRoom, controlAdmin, controlService) {
        const instructorQuery = await controlInstructor.find({id: sessionInstructor.id});
        const instructor = await controlInstructor.toAuxObject(instructorQuery[0], controlRoom, controlAdmin, this, controlService);

        session.setInstructor(instructor);
        return session;
    }
    
    async setSessionService(session, sessionService, controlService, controlInstructor, controlRoom, controlAdmin) {
        const serviceQuery = await controlService.find({name: sessionService.name});
        const service = await controlService.toAuxObject(serviceQuery[0], controlInstructor, controlRoom, controlAdmin, this);

        session.service = service;
        return session;
    }
}