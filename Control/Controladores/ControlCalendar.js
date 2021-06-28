const Calendar = require("../../Modelo/Calendar");
const DaoCalendar = require("../Daos/DaoCalendar");
const Controller = require("./Controller");

module.exports = class ControlCalendar extends Controller {
    constructor() {
        super(new DaoCalendar());
    }

    async toObject(schema, controlRoom, controlAdmin, controlSession, controlInstructor, controlService) {       
        const roomQuery = await controlRoom.find({name: schema.room.name});
        const room = await controlRoom.toAuxObject(roomQuery[0], controlAdmin, controlSession, controlInstructor, controlService);
        let calendar = new Calendar (
            room, 
            schema.month, 
            schema.year 
        );
        calendar = await this.setCalendarSessions(calendar, schema.sessions, controlSession, controlInstructor, controlService, controlRoom, controlAdmin);
        return calendar;
    }

    async toAuxObject(schema, controlRoom, controlAdmin, controlSession, controlInstructor, controlService) {        
        const roomQuery = await controlRoom.find({name: schema.room.name});
        const room = await controlRoom.toAuxObject(roomQuery[0], controlAdmin, controlSession, controlInstructor, controlService);
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
        return await this.handler.save(calendar);
    }

    async setCalendarSessions(calendar, sessionArray, controlSession, controlInstructor, controlService, controlRoom, controlAdmin) {
        // sessionArray es para cada dia un espacio
        for (var dayNum = 0; dayNum < sessionArray.length; dayNum++) {
            const day = sessionArray[dayNum];
            const scheduleSpaces = day.sessions1;
            for (var scheduleSpaceNum = 0; scheduleSpaceNum < scheduleSpaces.length; scheduleSpaceNum++) {
                const hourSpace = scheduleSpaces[scheduleSpaceNum];
                if (!(hourSpace.session.status === "Free Space")) {
                    // conseguir session
                    const sessionQuery = await controlSession.find(hourSpace.session);
                    const session = await controlSession.toAuxObject(sessionQuery[0], controlInstructor, controlService, controlRoom, controlAdmin);
                    calendar.addSession(session, session.getDay());
                }
            }
        }
        return calendar;
    }
}