module.exports = class Subscription {
    static #id = 0;

    constructor(client) {
        this.id = Subscription.#assignId();
        this.client = client;
        this.fee = 0;
        this.limit = 0;
        this.sessionCost = 1.0; // TODO conseguir precio de sesion
    }

    static #assignId() {
        return ++this.#id;
    }

    get getId() {
        return this.#id;
    }

    get getClient() {
        return this.client;
    }

    get getFee() {
        return this.fee;
    }

    /**
     * @param {float} sessionCost
     */
    set setSessionCost(sessionCost) {
        this.sessionCost = sessionCost;
    }

    get getSessionCost() {
        return this.sessionCost;
    }

    pay(amount) {
        this.fee += amount;
        this.limit = this.fee / this.sessionCost;
    }
}