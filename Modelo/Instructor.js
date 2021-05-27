const User = require('./user');

module.exports = class Instructor extends User {
    constructor(email, password, id, firstName, lastName, phone) {
        super(email, password, id, firstName, lastName, phone);
        this.isTemp = false;
        this.room = null;
        this.services = [];
        this.sessions = [];
    }

    get isTemp() {
        return this.isTemp;
    }
    
    setTemp() {
        this.isTemp = true;
    }

    setDefault() {
        this.isTemp = false;
    }

    /**
     * @param {Room} room
     */
    set setRoom(room) {
        this.room = room;
    }

    get getRoom() {
        return this.room;
    }

    set addSpecialty(specialty) {

    }

    addService(service) {
        if(!this.services.includes(service.getId())) {
            this.services.push(service);
        }
    }

    getService(id) {
        let serv = this.services.find(service => service.getId() == id);
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