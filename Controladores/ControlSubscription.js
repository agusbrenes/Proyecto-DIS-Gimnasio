const Subscription = require("../Modelo/Subscription");
const Controller = require("./Controller");

module.exports = class ControlSubscription extends Controller {
    constructor(handler){
        super(handler);
    }

    async save(object) {
        const subscription = new Subscription (
            object.client
        );
        return await this.handler.save(subscription);
    }
}