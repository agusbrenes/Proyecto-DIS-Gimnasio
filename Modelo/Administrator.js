import User from './user';

export default class Administrator extends User {
    constructor(email, password, id, firstName, lastName, phone) {
        super(email, password, id, firstName, lastName, phone);
        this.#adm_room = null;
    }

    /**
     * @param {Room} room
     */
    set setAdmRoom(room) {
        this.#adm_room = room;
    }

    get getAdmRoom() {
        return this.#adm_room;
    }
}