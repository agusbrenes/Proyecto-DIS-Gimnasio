const Calendar = require("../../Modelo/Calendar");
const DaoCalendar = require("../Daos/DaoCalendar");
const Controller = require("./Controller");

module.exports = class ControlCalendar extends Controller {
    constructor() {
        super(new DaoCalendar());
    }

    async toObject(schema, controlRoom, controlAdmin, controlSession, controlInstructor, controlService) {  
        //console.log("Schema Calendar en TO OBJECT", schema);      
        const roomQuery = await controlRoom.find({name: schema.room.name});
        const room = await controlRoom.toAuxObject(roomQuery[0], controlRoom, controlAdmin, controlSession, controlInstructor, controlService);
        //console.log("Room OBJECT AUX ControlCalendar aloooooooooooooo", room);
        let calendar = new Calendar (
            room, 
            schema.month, 
            schema.year 
        );
        //console.log("Calendar OBJECT ControlCalendar", calendar);
        //console.log("Calendar Schema Sessions", schema.sessions);
        calendar = await this.setCalendarSessions(calendar, schema.sessions, controlSession, controlInstructor, controlService, controlRoom, controlAdmin);
        //console.log("Calendar completo :=0000000", calendar);
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
        //console.log(calendar);
        return await this.handler.save(calendar);
    }

    async setCalendarSessions(calendar, sessionArray, controlSession, controlInstructor, controlService, controlRoom, controlAdmin) {
        // sessionArray es para cada dia un espacio
        //console.log("En setCalendarSessions en ControlCalendar", calendar, sessionArray);
        for (var dayNum = 0; dayNum < sessionArray.length; dayNum++) {
            const day = sessionArray[dayNum];
            const scheduleSpaces = day.sessions1;
            for (var scheduleSpaceNum = 0; scheduleSpaceNum < scheduleSpaces.length; scheduleSpaceNum++) {
                const hourSpace = scheduleSpaces[scheduleSpaceNum];
                //console.log("HourSpace", hourSpace);
                if (!(hourSpace.session.status === "Free Space")) {
                    // conseguir session
                    const sessionQuery = await controlSession.find(hourSpace.session);
                    const session = await controlSession.toAuxObject(sessionQuery[0], controlInstructor, controlService, controlRoom, controlAdmin);
                    //console.log("Session creada asdsdasdasdasdasdasdasdasd:", session);
                    calendar.addSession(session, session.getDay());
                }
            }
        }
        return calendar;
    }
}