import { Al_Dia, Moroso } from './status';
import User from './user';

export default class Client extends User {
    constructor(email, password, id, firstName, lastName, phone) {
        super(email, password, id, firstName, lastName, phone);
        this.#status = Al_Dia;
        this.#reservations = new Map();
        this.#subscriptions = [];
    }

    set setAlDia() {
        this.#status = Al_Dia;
    }  

    set setMoroso() {
        this.#status = Moroso;
    }  

    get getStatus() {
        return this.#status;
    }

    get getReservation(id) {
        return this.#reservations.get(id);
    }

    addReservation(reservation) {
        if (this.#reservations.length == this.#capacity) {
            throw new Error("This session is at its maximum capacity. Cannot add another reservation.");
        }
        this.#reservations.set(reservation.getId(), reservation);
    }

    deleteReservation(id) {
        if (this.#reservations.get(id) == undefined) {
            throw new Error("This reservation doesn't exist in the Session. Cannot perform delete operation.");
        }
        this.#reservations.delete(id);
    }

}