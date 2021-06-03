module.exports = class Service {
    static #id = 0;

    constructor(description, capacity, room, instructor) {
        this.id = Service.assignId();
        this.description = description;
        this.capacity = capacity;
        this.room = room;
        this.instructors = [instructor];
        this.sessions = [];
    }

    static assignId() {
        return ++this.#id;
    }

    get getId() {
        return this.id;
    }

    /**
     * @param {String} description
     */
    set setDescription(description) {
        this.description = description;
    }

    get getDescription() {
        return this.description;
    }

    /**
     * @param {Number} capacity
     */
    set setCapacity(capacity) {
        this.capacity = capacity;
    }

    get getCapacity() {
        return this.capacity;
    }

    get getRoom() {
        return this.room;
    }

    /* Funciones para meter cosas a los arrays */
    addInstructor(instructor) {
        if(!this.instructors.includes(instructor.getId())) {
            this.instructors.push(instructor);
        }
    }

    getInstructor(id) {
        let serv = this.instructors.find(instructor => instructor.getId() == id);
        return serv;
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
}