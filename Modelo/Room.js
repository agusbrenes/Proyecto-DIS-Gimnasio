const Administrator = require('./Admin.js');
const Calendar = require('./Calendar.js');
const Schedule = require('./Schedule.js');
const Service = require('./Service.js');
const Instructor = require('./Instructor.js');

module.exports = class Room {
    constructor(name, max_capacity, capacity, administrator, schedule) {
        this.name = name;
        this.max_capacity = max_capacity;
        this.capacity = capacity;
        this.schedule = schedule;
        this.administrators = [administrator];
        this.instructors = [];
        this.services = [];
        this.calendars = [];
    }

    /* Setters y getters */
    /**
     * @param {String} name
     */
    set setName(name) {
        this.name = name;
    }

    get getName() {
        return this.name;
    }

    /**
     * @param {int} max
     */
    set setMaxCapacity(max) {
        this.max_capacity = max;
    }

    get getMaxCapacity() {
        return this.max_capacity;
    }

    /**
     * @param {int} cap
     */
    set setCapacity(cap) {
        this.capacity = cap;
    }

    get getCapacity() {
        return this.capacity;
    }

    /**
     * @param {Schedule} schedule
     */
    set setSchedule(schedule) {
        this.schedule = schedule;
    }

    get getSchedule() {
        return this.schedule;
    }

    get getAdministrators() {
        return this.administrators;
    }

    get getInstructors() {
        return this.instructors;
    }

    get getServices() {
        return this.services;
    }

    get getCalendars() {
        return this.calendars;
    }

    /* Manipulacion de los arrays */
    addCalendar(c) {
        this.calendars.push(c);
    }

    getCalendar(y, m) {
        const c = new Calendar(y, m);
        const index = this.calendars.indexOf(c);
        return this.calendars[index];
    }

    addService(s) {
        if(!this.services.includes(s.getId())) {
            this.services.push(s);
        }
    }

    getService(id) {
        let serv = this.services.find(service => service.getId() == id);
        return serv;
    }

    addInstructor(ins) {
        if(!this.instructors.includes(ins.getId())) {
            this.instructors.push(ins);
        }
    }

    getInstructor(id) {
        let inst = this.instructors.find(instructor => instructor.getId() == id);
        return inst;
    }

    modifySchedule(bt, et) {
        this.schedule.setBeginTime(bt);
        this.schedule.setEndTime(et);
    }

    addAdmin(adm) {
        if(!this.administrators.includes(adm.getId())) {
            this.administrators.push(adm);
        }
    }

    getAdmin(id) {
        let adm = this.administrators.find(administrator => administrator.getId() == id);
        return adm;
    }
}