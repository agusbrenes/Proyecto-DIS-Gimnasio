module.exports = class PaymentMethod {
    static #id = 0;

    constructor(description) {
        this.id = PaymentMethod.assignId();
        this.description = description;
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

    setDescription(description) {
        this.description = description;
    }

    getDescription() {
        return this.description;
    }
}