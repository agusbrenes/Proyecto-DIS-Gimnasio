module.exports = class Session {
    static #id = 0;

    constructor(instructor, service, capacity, day, beginTime, endTime) {
        this.id = Session.#assignId();
        this.instructor = instructor;
        this.service = service;
        this.capacity = capacity;
        this.day = day;
        this.schedule = new Schedule(beginTime, endTime);
        this.reservations = new Map();
    }

    static #assignId() {
        return ++this.#id;
    }

    get getId() {
        return this.id;
    }

    /**
     * @param {Instructor} instructor
     */
    set setInstructor(instructor) {
        this.instructor = instructor;
    }

    get getInstructor() {
        return this.instructor;
    }

    /**
     * @param {Service} service
     */
    set setService(service) {
        this.service = service;
    }

    get getService() {
        return this.service;
    }

    /**
     * @param {Day} day
     */
    set setDay(day) {
        this.day = day;
    }

    get getDay() {
        return this.day;
    }

    /**
     * @param {Any} beginTime
     */
    set setBeginTime(beginTime) {
        this.schedule.setBeginTime(beginTime);
    }

    /**
     * @param {Any} endTime
     */
    set setEndTime(endTime) {
        this.schedule.setEndTime(endTime);
    }

    get getSchedule() {
        return this.schedule;
    }

    get getReservations() {
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