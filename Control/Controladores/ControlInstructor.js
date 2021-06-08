const FactoryInstructor = require("../../Modelo/FactoryInstructor");

const ControlRoom = require("./ControlRoom");
const ControlService = require("./ControlService");
const ControlSession = require("./ControlSession");
const ControlUsers = require("./ControlUsers");

const DaoInstructor = require("../Daos/DaoInstructor");

module.exports = class ControlInstructor extends ControlUsers {
    constructor() {
        super(new DaoInstructor());
        this.factory = new FactoryInstructor();
    }

    async toObject(schema) {
        let user = this.factory.createUser(
            schema.email,
            schema.password,
            schema.id,
            schema.firstName,
            schema.lastName,
            schema.phone
        );
        user.setTemp(schema.isTemp);
        user = await this.setInstructorRoom(user, schema.room);
        user = await this.setInstructorServices(user, schema.services);
        user = await this.setInstructorSessions(user, schema.sessions)
        return user;
    }

    async save(object) {
        const schema = await super.save(object);
        return await this.toObject(schema);
    }

    async setInstructorRoom(instructor, instructorRoom) {
        const control = new ControlRoom();
        const roomQuery = await control.find({room: instructorRoom.name});
        const room = control.toObject(roomQuery[0]); // falta toObject
        instructor.setRoom(room);
        return instructor;
    }

    async setInstructorServices(instructor, serviceArray) {
        const control = new ControlService();
        for (var i = 0; i < serviceArray.length; i++) {
            const service = await control.find(serviceArray[i]);
            instructor.addService(service);
        }
        return instructor;
    }

    async setInstructorSessions(instructor, sessionArray) {
        const control = new ControlSession();
        for (var i = 0; i < sessionArray.length; i++) {
            const session = await control.find(sessionArray[i]);
            instructor.addSession(session);
        }
        return instructor;
    }

    // addSpeciality(idInstructor, idSpeciality) {
    //     //Speciality -> Service
    //     //lol

    //     //fix this
    //     const service = getService(idSpeciality)
    //     const instructor = getInstructor(idInstructor)

    //     //Esta función ya comprueba que el service ya está puesto en el instructor.
    //     instructor.addService(service);

    //     //update instructor.
    // }

    // createSession(idInstructor, idService, capacity, dayName, dayNumber, beginTime, endTime) {
    //     const instructor = getInstructor(idInstructor); //fix
    //     const service = instructor.getService(idService);
    //     const day = getDay(dayName, dayNumber); //fix

    //     session = new Session(instructor, service, capacity, day, beginTime, endTime);
    //     instructor.addSession(session);

    //     //update instructor.
    //     //save session.
    // }

    // checkCalendar(idInstructor) {
    //     const instructor = getInstructor(idInstructor);
    //     const room = instructor.room;
        
    //     var today = new Date();
    //     const year = Date.prototype.getFullYear(today);
    //     const month = Date.prototype.getMonth(today);

    //     const calendar = room.getCalendar(year, month);
    //     return calendar;
    // }
}