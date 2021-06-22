const Session = require("../../Modelo/Session");
const Controller = require("./Controller");

const DaoSession = require("../DAOs/DaoSession");
const ControlInstructor = require("./ControlInstructor");
const ControlService = require("./ControlService");
const ControlDay = require("./ControlDay");
const ControlReservation = require("./ControlReservation");
const SessionRegisterAdmin = require("../../Modelo/SessionRegisterAdmin");
const SessionRegisterInstructor = require("../../Modelo/SessionRegisterInstructor");

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
            object.month,
            object.day,            
            object.initialHour,
            object.totalHours
        );
        return await this.handler.save(session);
    }
    
    async toObject(schema) {
        const controlInstructor = new ControlInstructor();
        const controlService = new ControlService();
        // const controlDay = new ControlDay();

        const instructorQuery = await controlInstructor.find({id: schema.instructor.id});
        const instructor = await controlInstructor.toObject(instructorQuery[0]);
        const serviceQuery = await controlService.find({id: schema.service.id});
        const service = await controlService.toObject(serviceQuery[0]); 

        // const query = {
        //     number: schema.day.number, 
        //     name: schema.day.name
        // };
        // const dayQuery = await controlDay.find(query);
        // const day = await controlService.toObject(dayQuery[0]);

        let session = new Session (
            instructor,
            service,
            schema.capacity,
            schema.month,
            schema.day,            
            schema.initialHour,
            schema.totalHours,
            schema.status
        );
        session = await this.setSessionReservations(reservation, schema.reservations);
        return session;
    }

    // Yaa no se usa
    async setSessionReservations(session, reservationArray) {
        const control = new ControlReservation();
        for (var i = 0; i < reservationArray.length; i++) {
            const reservationQuery = await control.find(reservationArray[i]); //
            const reservation = control.toObject(reservationQuery[0]);
            session.addReservation(reservation);
        }
        return session;
    }
}