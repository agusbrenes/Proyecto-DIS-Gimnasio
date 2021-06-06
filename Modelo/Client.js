const Status = require('./status');
const User = require('./user');

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

    set setReservations(reservations) {
        this.reservations = reservations;
    }

    getReservation(id) {
        return this.reservations.get(id);
    }

    addReservation(reservation) {
        this.reservations.set(reservation.getId(), reservation);
    }

    deleteReservation(id) {
        if (this.reservations.get(id) == undefined) {
            throw new Error("This reservation doesn't exist in the Session. Cannot perform delete operation.");
        }
        this.reservations.delete(id);
    }

    payReservation(id, payMethod) { // la cantidad por pagar?
        const reservation = this.reservations.get(id);
        reservation.setPaymentMethod(payMethod);
        reservation.pay();
    }

    get getSubscriptions() {
        return this.subscriptions;
    }

    set setReservations(reservations) {
        this.reservations = reservations;
    }

    getSubscription(id) {
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
}