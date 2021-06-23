const Session = require("../../Modelo/Session");
const Controller = require("./Controller");

const DaoSession = require("../DAOs/DaoSession");
const ControlInstructor = require("./ControlInstructor");
const ControlService = require("./ControlService");
const ControlReservation = require("./ControlReservation");
const SessionRegisterAdmin = require("../../Modelo/SessionRegisterAdmin");
const SessionRegisterInstructor = require("../../Modelo/SessionRegisterInstructor");
const ControlCalendar = require("./ControlCalendar");
const ControlRoom = require("./ControlRoom");

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
            object.capacity,
            object.room,
            object.schedule.month,
            object.schedule.day,            
            object.schedule.initialHour,
            object.schedule.totalHours
        );
        return await this.handler.save(session);
    }
    
    async toObject(schema) {
        const controlInstructor = new ControlInstructor();
        const controlService = new ControlService();
        const controlRoom = new ControlRoom();

        const instructorQuery = await controlInstructor.find({id: schema.instructor.id});
        const instructor = await controlInstructor.toObject(instructorQuery[0]);

        const serviceQuery = await controlService.find({name: schema.service.name});
        const service = await controlService.toObject(serviceQuery[0]); 

        const roomQuery = await controlRoom.find({name: schema.room.name});
        const room = await controlRoom.toObject(roomQuery[0]); 

        let session = new Session (
            instructor,
            service,
            room,
            schema.capacity,
            schema.month,
            schema.day,            
            schema.initialHour,
            schema.totalHours,
            schema.status
        );
        // session = await this.setSessionReservations(reservation, schema.reservations);
        return session;
    }

    // Yaa no se usa
    async setSessionReservations(session, reservationArray) {
        const control = new ControlReservation();
        for (var i = 0; i < reservationArray.length; i++) {
            const reservationQuery = await control.find(reservationArray[i]); 
            const reservation = control.toObject(reservationQuery[0]);
            session.addReservation(reservation);
        }
        return session;
    }

    async addtoCalendar(sessionSchema) {
        const control = new ControlCalendar();
        const query = {
            room: {
                name: sessionSchema.room.name,
                capacity: sessionSchema.room.capacity
            },
            month: sessionSchema.schedule.month,
            year: sessionSchema.year
        };
        const calendarQuery = await control.find(query);

        const session = await this.toObject(sessionSchema);
        const calendar = await control.toObject(calendarQuery[0]);
        calendar.addSession(session, session.getDay());

        return await control.save(calendar);
    }
}