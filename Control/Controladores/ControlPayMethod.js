const Controller = require("./Controller");
const PaymentMethod = require("../../Modelo/PaymentMethod");

const DaoPaymentMethod = require('../DAOs/DaoPaymentMethod');

module.exports = class ControlPayMethod extends Controller {
    constructor() {
        super(new DaoPaymentMethod());
    }

    async save(object) {
        const method = new PaymentMethod (
            object.name
        );
        return await this.handler.save(method);
    }

    toObject(schema) {
        return new PaymentMethod(
            schema.name
        );
    }
}