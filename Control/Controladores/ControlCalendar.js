const Calendar = require("../../Modelo/Calendar");
const DaoCalendar = require("../Daos/DaoCalendar");
const Controller = require("./Controller");

module.exports = class ControlCalendar extends Controller {
    constructor() {
        super(new DaoCalendar());
    }

    async toObject(schema, controlRoom, controlAdmin, controlSession, controlInstructor, controlService) {        
        const roomQuery = await controlRoom.find({name: schema.room.name});
        const room = await controlRoom.toAuxObject(roomQuery[0], controlAdmin);
        let calendar = new Calendar (
            room, 
            schema.month, 
            schema.year 
        );
        calendar = this.setCalendarSessions(calendar, schema.sessions, controlSession, controlInstructor, controlService, controlRoom, controlAdmin);
        return calendar;
    }

    async toAuxObject(schema, controlRoom, controlAdmin) {        
        const roomQuery = await controlRoom.find({name: schema.room.name});
        const room = await controlRoom.toAuxObject(roomQuery[0], controlAdmin);
        let calendar = new Calendar (
            room, 
            schema.month, 
            schema.year 
        );
        return calendar;
    }

    async save(object) {
        const calendar = new Calendar (
            object.room, 
            object.month, 
            object.year
        );
        console.log(calendar);
        return await this.handler.save(calendar);
    }

    async setCalendarSessions(calendar, sessionArray, controlSession, controlInstructor, controlService, controlRoom, controlAdmin) {
        for (var i = 0; i < sessionArray.length; i++) {
            const sessionQuery = await controlSession.find(sessionArray[i]);
            const session = await controlSession.toAuxObject(sessionQuery[0], controlInstructor, controlService, controlRoom, controlAdmin);
            calendar.addSession(session, session.getDay()); 
        }
        return calendar;
    }
}