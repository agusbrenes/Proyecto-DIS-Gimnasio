const Subscription = require("../../Modelo/Subscription");
const Controller = require("./Controller");

const DaoSubscription = require('../DAOs/DaoSubscription');
const ControlClient = require("./ControlClient");

module.exports = class ControlSubscription extends Controller {
    constructor() {
        super(new DaoSubscription());
    }

    toObject(schema) {
        const control = new ControlClient();

        const clientQuery = await control.find({id: schema.client.id});
        const client = control.toObject(clientQuery[0]);
        return new Subscription(client);
    }

    async save(object) {
        const subscription = new Subscription (
            object.client
        );
        return await this.handler.save(subscription);
    }
}