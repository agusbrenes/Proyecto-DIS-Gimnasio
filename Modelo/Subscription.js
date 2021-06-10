module.exports = class Subscription {
    static #id = 0;

    constructor(client) {
        this.id = Subscription.assignId();
        this.client = client;
        this.fee = 0;
        this.limit = 0;
        this.sessionCost = 1.0; // TODO conseguir precio de sesion
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

    getClient() {
        return this.client;
    }

    getFee() {
        return this.fee;
    }

    setSessionCost(sessionCost) {
        this.sessionCost = sessionCost;
    }

    getSessionCost() {
        return this.sessionCost;
    }

    pay(amount) {
        this.fee += amount;
        this.limit = this.fee / this.sessionCost;
    }
}