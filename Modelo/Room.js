import Administrator from './Administrator.js';
import Calendar from './Calendar.js';
import Schedule from './Schedule.js';
import Service from './Service.js';
import Instructor from './Instructor.js';

export default class Room {
    constructor(name, max_capacity, capacity, administrator, schedule) {
        this.#name = name;
        this.#max_capacity = max_capacity;
        this.#capacity = capacity;
        this.#schedule = schedule;
        this.#administrators = [administrator];
        this.#instructors = [];
        this.#services = [];
        this.#calendars = [];
    }

    /* Setters y getters */
    /**
     * @param {String} name
     */
    set setName(name) {
        this.#name = name;
    }

    get getName() {
        return this.#name;
    }

    /**
     * @param {int} max
     */
    set setMaxCapacity(max) {
        this.#max_capacity = max;
    }

    get getMaxCapacity() {
        return this.#max_capacity;
    }

    /**
     * @param {int} cap
     */
    set setCapacity(cap) {
        this.#capacity = cap;
    }

    get getCapacity() {
        return this.#capacity;
    }

    /**
     * @param {Schedule} schedule
     */
    set setSchedule(schedule) {
        this.#schedule = schedule;
    }

    get getSchedule() {
        return this.#schedule;
    }

    get getAdministrators() {
        return this.#administrators;
    }

    get getInstructors() {
        return this.#instructors;
    }

    get getServices() {
        return this.#services;
    }

    get getCalendars() {
        return this.#calendars;
    }

    /* Manipulacion de los arrays */
    addCalendar(c) {
        this.#calendars.push(c);
    }

    get getCalendar(y, m) {
        const c = new Calendar(y, m);
        const index = this.#calendars.indexOf(c);
        return this.#calendars[index];
    }

    addService(s) {
        if(!this.#services.includes(s.getId())) {
            this.#services.push(s);
        }
    }

    get getService(id) {
        let serv = this.#services.find(service => service.getId() == id);
        return serv;
    }

    addInstructor(ins) {
        if(!this.#instructors.includes(ins.getId())) {
            this.#instructors.push(ins);
        }
    }

    get getInstructor(id) {
        let inst = this.#instructors.find(instructor => instructor.getId() == id);
    }

    modifySchedule(bt, et) {
        this.#schedule.setBeginTime(bt);
        this.#schedule.setEndTime(bt);
    }

    addAdmin(adm) {
        if(!this.#administrators.includes(adm.getId())) {
            this.#administrators.push(adm);
        }
    }

    get getAdmin(id) {
        let adm = this.#administrators.find(administrator => administrator.getId() == id);
        return adm;
    }
}