module.exports = class Subscription {
    constructor(client) {
        this.client = client;
        this.fee = 0;
        this.limit = 0;
        this.sessionCost = 10.0; // TODO conseguir precio de sesion
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