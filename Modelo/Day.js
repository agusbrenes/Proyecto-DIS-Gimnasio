const Calendar = require('./Calendar.js');
const Session = require('./Session.js');
const Schedule = require('./Schedule.js');

module.exports = class Day {
    constructor(number, name, schedule) {
        this.number = number;
        this.name = name;
        this.schedule = schedule;
        this.calendars = [];
        this.sessions = [];
    }

    get getNumber() {
        return this.number;
    }

    setNumber(num) {
        this.number = num;
    }

    get getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    get getSchedule() {
        return this.schedule;
    }

    setSchedule(schedule) {
        this.schedule = schedule;
    }

    get getCalendars() {
        return this.calendars;
    }

    get getSessions() {
        return this.sessions;
    }

    /* Agregar cosas a los arrays */
    addCalendar(calendar) {
        if(!this.calendars.includes(calendar.getYear()) && !this.getCalendars.includes(calendar.getMonth())) {
            this.calendars.push(calendar);
        }
    }

    getCalendar(year, month) {
        let calendar = this.calendars.find(calendar => (calendar.getYear() == year) && (calendar.getMonth() == month));
        return calendar;
    }

    addSession(session) {
        if(!this.sessions.includes(session.getId())) {
            this.sessions.push(session);
        }
    }

    getSession(id) {
        let sess = this.sessions.find(session => session.getId() == id);
        return sess;
    }

    /* Otra cosa */
    modifySchedule(bt, et) {
        this.schedule.setBeginTime(bt);
        this.schedule.setEndTime(et);
    }
}