import Calendar from './Calendar.js';
import Session from './Session.js';
import Schedule from './Schedule.js';

export default class Day {
    constructor(number, name, schedule) {
        this.#number = number;
        this.#name = name;
        this.#schedule = schedule;
        this.#calendars = [];
        this.#sessions = [];
    }

    get getNumber() {
        return this.#number;
    }

    /**
     * @param {Number} num
     */
    set setNumber(num) {
        this.#number = num;
    }

    get getName() {
        return this.#name;
    }

    /**
     * @param {String} name
     */
    set setName(name) {
        this.#name = name;
    }

    get getSchedule() {
        return this.#schedule;
    }

    /**
     * @param {Schedule} schedule
     */
    set setSchedule(schedule) {
        this.#schedule = schedule;
    }

    get getCalendars() {
        return this.#calendars;
    }

    get getSessions() {
        return this.#sessions;
    }

    /* Agregar cosas a los arrays */
    addCalendar(calendar) {
        if(!this.#calendars.includes(calendar.getYear()) && !this.getCalendars.includes(calendar.getMonth())) {
            this.#calendars.push(calendar);
        }
    }

    getCalendar(year, month) {
        let calendar = this.#calendars.find(calendar => (calendar.getYear() == year) && (calendar.getMonth() == month));
        return calendar;
    }

    addSession(session) {
        if(!this.#sessions.includes(session.getId())) {
            this.#sessions.push(session);
        }
    }

    getSession(id) {
        let sess = this.#sessions.find(session => session.getId() == id);
        return sess;
    }

    /* Otra cosa */
    modifySchedule(bt, et) {
        this.#schedule.setBeginTime(bt);
        this.#schedule.setEndTime(et);
    }
}