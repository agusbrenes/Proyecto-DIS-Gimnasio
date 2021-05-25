export default class PaymentMethod {
    static #id = 0;

    constructor(description) {
        this.#id = PaymentMethod.assignId();
        this.#description = description;
    }

    static assignId() {
        return ++this.#id;
    }

    get getId() {
        return this.#id;
    }

    /**
     * @param {String} description
     */
    set setDescription(description) {
        this.#description = description;
    }

    get getDescription() {
        return this.#description;
    }
}