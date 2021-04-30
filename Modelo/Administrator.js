export default class Administrator {
    constructor(username, password) {
        this.#username = username;
        this.#password = password;
        this.#adm_room = null;
    }

    /**
     * @param {String} username
     */
    set setUsername(username) {
        this.#username = username;
    }

    get getUsername(){
        return this.#username;
    }

    /**
     * @param {String} password
     */
    set setPassword(password) {
        this.#password = password;
    }

    get getPassword() {
        return this.#password;
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