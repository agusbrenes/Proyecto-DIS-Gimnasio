const Calendar = require("../../Modelo/Calendar");
const DaoCalendar = require("../Daos/DaoCalendar");
const ControlDay = require("./ControlDay");
const Controller = require("./Controller");
const ControlRoom = require("./ControlRoom");

module.exports = class ControlCalendar extends Controller {
    constructor() {
        super(new DaoCalendar());
    }

    async toObject(schema) {
        const controlRoom = new ControlRoom();
        
        const roomQuery = await controlRoom.find({id: schema.room.id});
        const room = await controlRoom.toObject(roomQuery[0]);
        let calendar = new Calendar (
            room, 
            schema.month, 
            schema.year 
        );
        calendar = await this.setCalendarDays(calendar, schema.days);
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

    async setCalendarDays(calendar, dayArray) {
        const control = new ControlDay();
        for (var i = 0; i < dayArray.length; i++) {
            const dayQuery = await control.find(dayArray[i]);
            const day = control.toObject(dayQuery[0]);
            calendar.addDay(day);
        }
        return calendar;
    }

}