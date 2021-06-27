const Schedule = require("./Schedule");
const Status = require('./SessionStatus');

module.exports = class Session {
    constructor(instructor, service, room, capacity, year, month, day, initialHour, totalHours, status) {
        this.instructor = instructor;
        this.service = service;
        this.room = room;
        this.capacity = capacity;
        this.schedule = new Schedule(month, day, initialHour, totalHours);
        this.year = year;
        this.reservations = new Map();
        this.status = status;
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

    setRoom(room) {
        this.room = room;
    }

    getRoom() {
        return this.room;
    }

    getMonth() {
        return this.schedule.getMonth();
    }

    setMonth(month) {
        this.schedule.setMonth(month);
    }

    getDay() {
        return this.schedule.getDay();
    }

    setDay(day) {
        this.schedule.setDay(day);
    }

    getInitialHour() {
        return this.schedule.getInitialHour();
    }

    setInitialHour(hour) {
        this.schedule.setInitialHour(hour);
    }

    getTotalHours() {
        return this.schedule.getTotalHours();
    }

    setTotalHours(hours) {
        this.schedule.setTotalHours(hours);
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

    getStatus() {
        return this.status;
    }

    authorize(adminName) {
        this.status = Status.Authorized;
        this.notify(adminName);
    }

    reject() {
        this.status = Status.Rejected;
    }

    notify(adminName) {
        this.instructor.updateSession(adminName, this);
    }
}