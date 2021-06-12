const Schedule = require("./Schedule");

module.exports = class Session {
    constructor(instructor, service, capacity, day, beginTime, endTime) {
        this.instructor = instructor;
        this.service = service;
        this.capacity = capacity;
        this.day = day;
        this.schedule = new Schedule(beginTime, endTime);
        this.reservations = new Map();
    }

    setInstructor(instructor) {
        this.instructor = instructor;
    }

    getInstructor() {
        return this.instructor;
    }

    setService(service) {
        this.service = service;
    }

    getService() {
        return this.service;
    }

    setDay(day) {
        this.day = day;
    }

    getDay() {
        return this.day;
    }

    setBeginTime(beginTime) {
        this.schedule.setBeginTime(beginTime);
    }

    setEndTime(endTime) {
        this.schedule.setEndTime(endTime);
    }

    getSchedule() {
        return this.schedule;
    }

    getReservations() {
        return this.reservations;
    }

    getReservation(id) {
        return this.reservations.get(id);
    }

    addReservation(reservation) {
        if (this.reservations.length == this.capacity) {
            throw new Error("This session is at its maximum capacity. Cannot add another reservation.");
        }
        this.reservations.set(reservation.getId(), reservation);
    }

    deleteReservation(id) {
        if (this.reservations.get(id) == undefined) {
            throw new Error("This reservation doesn't exist in the Session. Cannot perform delete operation.");
        }
        this.reservations.delete(id);
    }
}