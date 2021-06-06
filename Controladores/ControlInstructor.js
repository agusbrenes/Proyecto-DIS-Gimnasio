const FactoryInstructor = require("../Modelo/FactoryInstructor");
const ControlUsers = require("./ControlUsers");
const DaoInstructor = require("./DaoInstructor");

module.exports = class ControlInstructor extends ControlUsers {

    addSpeciality(idInstructor, idSpeciality) {
        //Speciality -> Service
        //lol

        //fix this
        const service = getService(idSpeciality)
        const instructor = getInstructor(idInstructor)

        //Esta función ya comprueba que el service ya está puesto en el instructor.
        instructor.addService(service);

        //update instructor.
    }

    createSession(idInstructor, idService, capacity, dayName, dayNumber, beginTime, endTime) {
        const instructor = getInstructor(idInstructor); //fix
        const service = instructor.getService(idService);
        const day = getDay(dayName, dayNumber); //fix

        session = new Session(instructor, service, capacity, day, beginTime, endTime);
        instructor.addSession(session);

        //update instructor.
        //save session.
    }

    checkCalendar(idInstructor) {
        const instructor = getInstructor(idInstructor);
        const room = instructor.room;
        
        var today = new Date();
        const year = Date.prototype.getFullYear(today);
        const month = Date.prototype.getMonth(today);

        const calendar = room.getCalendar(year, month);
        return calendar;
    }
}