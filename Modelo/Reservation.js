export default class Reservation {
    static #id = 0;

    constructor(client, session, date) {
        this.#id = Reservation.assignId();
        this.#client = client;
        this.#session = session;
        this.#date = date;
        this.#paymentMethod = null;
        this.#isConfirmed = false;
    }

    static assignId() {
        return ++this.#id;
    }

    get getId() {
        return this.#id;
    }

    get getClient() {
        return this.#client;
    }

    /**
     * @param {Session} session
     */
    set setSession(session) {
        this.#session = session;
    }

    get getSession() {
        return this.#session;
    }

    /**
     * @param {Date} date
     */
    set setDate(date) {
        this.#date = date;
    }

    get getDate() {
        return this.#date;
    }

    /**
     * @param {PaymentMethod} paymentMethod
     */
    set setPaymentMethod(paymentMethod) {
        this.#paymentMethod = paymentMethod;
    }

    get getPaymentMethod() {
        return this.#paymentMethod;
    }

    get isConfirmed() {
        return this.#isConfirmed;
    }

    confirm() {
        this.#isConfirmed = true;
    }

    cancel() {
        this.#isConfirmed = false;
    }
}