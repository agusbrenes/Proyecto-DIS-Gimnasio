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
        const schema = await this.handler.save(session);
        await this.addtoCalendar(schema);
        await this.addtoService(schema);
        return schema;
    }
    
    async toObject(schema, controlInstructor, controlService, controlRoom) {
        console.log("Schema Session ", schema);
        const instructorQuery = await controlInstructor.find({id: schema.instructor.id});
        const instructor = await controlInstructor.toAuxObject(instructorQuery[0]);

        const serviceQuery = await controlService.find({name: schema.service.name});
        const service = await controlService.toAuxObject(serviceQuery[0]); 

        const roomQuery = await controlRoom.find({name: schema.room.name});
        const room = await controlRoom.toAuxObject(roomQuery[0]); 

        let session = new Session ( ///
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
    
    async toAuxObject(schema, controlInstructor, controlService, controlRoom, controlAdmin) {
        const instructorQuery = await controlInstructor.find({id: schema.instructor.id});
        const instructor = await controlInstructor.toAuxObject(instructorQuery[0]);

        const serviceQuery = await controlService.find({name: schema.service.name});
        const service = await controlService.toAuxObject(serviceQuery[0], controlInstructor, controlRoom, controlAdmin); 

        const roomQuery = await controlRoom.find({name: schema.room.name});
        const room = await controlRoom.toAuxObject(roomQuery[0], controlAdmin);       

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

    async addtoCalendar(sessionSchema) {
        const dao = new DaoCalendar();
        const query = {
            room: {
                name: sessionSchema.room.name
            },
            month: sessionSchema.schedule.month,
            year: sessionSchema.year
        };
        const calendarQuery = await dao.find(query);

        const calendar = calendarQuery[0];
        calendar.sessions.push(sessionSchema);

        return await dao.modify(query, calendar);
    }

    async addtoService(sessionSchema) {
        const dao = new DaoService();
        const query = {
            name: sessionSchema.service.name
        };
        const serviceQuery = await dao.find(query);

        const service = serviceQuery[0];
        service.sessions.push(sessionSchema);

        return await dao.modify(query, service);
    }
}