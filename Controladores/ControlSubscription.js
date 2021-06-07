const Subscription = require("../Modelo/Subscription");
const Controller = require("./Controller");
const DaoSubscription = require('./DaoSubscription');

module.exports = class ControlSubscription extends Controller {
    constructor() {
        super(new DaoSubscription());
    }

    async save(object) {
        const subscription = new Subscription (
            object.client
        );
        return await this.handler.save(subscription);
    }
}