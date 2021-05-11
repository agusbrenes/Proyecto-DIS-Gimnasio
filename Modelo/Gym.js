import Room from './room';

export default class Gym {
    constructor(id, name) {
        this.#id = id;
        this.#name = name;
        this.#rooms = [];
    }

    /**
     * @param {int} id
     */
    set setId(id) {
        this.#id = id;
    }

    get getId() {
        return this.#id;
    }

    /**
     * @param {String} name
     */
    set setName(name) {
        this.#name = name;
    }

    get getName() {
        return this.#name;
    }

    get getRooms() {
        return this.#rooms;
    }

    /* Funciones para meter rooms al array */
    /**
     * @param {Room} room
     */
    add_room(room) {
        // Esto debería revisar si el room ya existe en el Gym, pero no estoy seguro si funciona. -Eduardo
        // Si comparo el objeto como tal esto da falso, por lo que hay que comparar con el String ._.
        if(!this.#rooms.includes(room.getName())){
            this.#rooms.push(room);
        }
    }

    /**
     * @param {Room} room
     */
    delete_room(room) {
        // Esto debería revisar si el room ya existe en el Gym, pero no estoy seguro si funciona. -Eduardo
        const index = this.#rooms.indexOf(room);
        if (index > -1) {
            this.#rooms.splice(index, 1);
        } else {
            throw new Error("This room doesn't exist in the Gym. Cannot perform delete operation.");
        }
    }

    get get_room(room) {
        const index = this.#rooms.indexOf(room);
        return this.#rooms[index];
    }
}