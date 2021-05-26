const Status = require('./status');
const User = require('./user');
const ClientSchema = require("./ClientSchema");

module.exports = class Client extends User {
    constructor(email, password, id, firstName, lastName, phone) {
        super(email, password, id, firstName, lastName, phone);
        this.status = Status.Al_Dia;
        this.reservations = new Map();
        this.subscriptions = new Map();
    }

    setAlDia() {
        this.status = Status.Al_Dia;
    }  

    setMoroso() {
        this.status = Status.Moroso;
    }  

    get getStatus() {
        return this.status;
    }

    get getReservations() {
        return this.reservations;
    }

    getReservation(id) {
        return this.reservations.get(id);
    }

    addReservation(reservation) {
        if (this.reservations.length == this.capacity) {
            throw new Error("This session is at its maximum capacity. Cannot add another reservation.");
        }
        this.reservations.set(reservation.getId(), reservation);
    }

    deleteReservation(id) {
        if (this.reservations.get(id) == undefined) {
            throw new Error("This reservation doesn't exist in the Session. Cannot perform delete operation.");
        }
        this.reservations.delete(id);
    }

    get getSubscription() {
        return this.subscriptions;
    }

    getSubscriptions(id) {
        return this.subscriptions.get(id);
    }

    addSubscription(subscription) {
        this.subscriptions.set(subscription.getId(), subscription);
    }

    deleteSubscription(id) {
        if (this.subscriptions.get(id) == undefined) {
            throw new Error("This subscription doesn't exist in the User. Cannot perform delete operation.");
        }
        this.subscriptions.delete(id);
    }

    toMongoSchema(){
        return new ClientSchema({
            email: this.email,
            password: this.password,
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            phone: this.phone,
            status: this.status,
            reservations: this.reservations.values(),
            subscriptions: this.subscriptions.values()
        });
    }
}