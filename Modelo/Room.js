const Calendar = require('./Calendar.js');
const Schedule = require('./Schedule.js');

module.exports = class Room {
    constructor(name, maxCapacity, capacity, administrator, beginTime, endTime) {
        this.name = name;
        this.maxCapacity = maxCapacity;
        this.capacity = capacity;
        this.schedule = new Schedule(beginTime, endTime);
        this.administrators = [administrator];
        this.instructors = [];
        this.services = [];
        this.calendars = [];
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    setMaxCapacity(max) {
        this.maxCapacity = max;
    }

    getMaxCapacity() {
        return this.maxCapacity;
    }

    setCapacity(cap) {
        this.capacity = cap;
    }

    getCapacity() {
        return this.capacity;
    }

    setSchedule(schedule) {
        this.schedule = schedule;
    }

    getSchedule() {
        return this.schedule;
    }

    getAdministrators() {
        return this.administrators;
    }

    getInstructors() {
        return this.instructors;
    }

    getServices() {
        return this.services;
    }

    getCalendars() {
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