module.exports = class Reservation {
    static #id = 0;

    constructor(client, session) {
        this.id = Reservation.assignId();
        this.client = client;
        this.session = session;
        this.paymentMethod = null;
        this.isConfirmed = false;
    }

    static assignId() {
        return ++this.#id;
    }

    setId(id) {
        this.id = id;
    }

    getId() {
        return this.id;
    }

    getClient() {
        return this.client;
    }

    setSession(session) {
        this.session = session;
    }

    getSession() {
        return this.session;
    }

    setPaymentMethod(paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    getPaymentMethod() {
        return this.paymentMethod;
    }

    isConfirmed() {
        return this.isConfirmed;
    }

    pay() {
        if (this.paymentMethod = null) {
            throw new Error("Payment Method has not been defined. Cannot pay reservation without valid payment Method.");
        }            
        this.isConfirmed = true;
    }

    cancel() {
        this.isConfirmed = false;
    }
}