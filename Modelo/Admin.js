const User = require('./user');

module.exports = class Admin extends User {
    constructor(email, password, id, firstName, lastName, phone) {
        super(email, password, id, firstName, lastName, phone);
        this.room = null;
    }
    
    setRoom(room) {
        this.room = room;
    }

    getRoom() {
        return this.room;
    }
}