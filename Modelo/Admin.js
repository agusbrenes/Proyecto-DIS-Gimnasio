const User = require('./user');

module.exports = class Admin extends User {
    constructor(email, password, id, firstName, lastName, phone) {
        super(email, password, id, firstName, lastName, phone);
        this.admRoom = null;
    }

    /**
     * @param {Room} room
     */
    set setAdmRoom(room) {
        this.admRoom = room;
    }

    get getAdmRoom() {
        return this.admRoom;
    }
}