module.exports = class Service {
    constructor(name, room, roomCapacity, instructor) {
        this.name = name;
        this.room = room;
        this.roomCapacity = roomCapacity;
        this.instructors = [instructor];
        this.sessions = [];
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
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