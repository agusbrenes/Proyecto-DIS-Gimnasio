const Calendar = require('./Calendar.js');
const Schedule = require('./Schedule.js');

module.exports = class Room {
    constructor(name, maxCapacity, capacity, administrator, initialHour, totalHours) {
        this.name = name;
        this.maxCapacity = maxCapacity;
        this.capacity = capacity;
        this.schedule = {
            initialHour: initialHour, 
            totalHours: totalHours
        };
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
        const c = new Calendar(this, y, m);
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

    updateCalendar(instructorName, incomingCalendar) {
        if (this.calendars.length > 0) {
            this.calendars.forEach(calendar => {
                if (calendar.room.name === incomingCalendar.room.name &&
                    calendar.month === incomingCalendar.month &&
                    calendar.year === incomingCalendar.year) {

                        calendar = incomingCalendar;

                    }
            });

            var message = instructorName + " has requested a new session!";

            if (this.administrators.length > 0) {
                this.administrators.forEach(administrator => {
                    administrator.messages.push(message);
                });
            }
        }
    }
}