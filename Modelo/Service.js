module.exports = class Service {
    static #id = 0;

    constructor(description, room, instructor) {
        this.id = Service.assignId();
        this.description = description;
        this.room = room;
        this.instructors = [instructor];
        this.sessions = [];
    }

    static assignId() {
        return ++this.#id;
    }

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    setDescription(description) {
        this.description = description;
    }

    getDescription() {
        return this.description;
    }

    getRoom() {
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