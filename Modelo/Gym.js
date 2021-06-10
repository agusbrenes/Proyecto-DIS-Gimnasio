const Room = require('./Room.js');

module.exports = class Gym {
    static #id = 0;

    constructor(name) {
        this.id = Gym.assignId();
        this.name = name;
        this.rooms = [];
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

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    getRooms() {
        return this.rooms;
    }

    /* Funciones para meter rooms al array */
    /**
     * @param {Room} room
     */
    addRoom(room) {
        // Esto debería revisar si el room ya existe en el Gym, pero no estoy seguro si funciona. -Eduardo
        // Si comparo el objeto como tal esto da falso, por lo que hay que comparar con el String ._.
        if(!this.rooms.includes(room.getName())){
            this.rooms.push(room);
        }
    }

    /**
     * @param {Room} room
     */
    deleteRoom(room) {
        // Esto debería revisar si el room ya existe en el Gym, pero no estoy seguro si funciona. -Eduardo
        const index = this.rooms.indexOf(room);
        if (index > -1) {
            this.rooms.splice(index, 1);
        } else {
            throw new Error("This room doesn't exist in the Gym. Cannot perform delete operation.");
        }
    }

    getRoom(name) {
        let room = this.rooms.find(room => room.getName() == name);
        return room;
    }
}