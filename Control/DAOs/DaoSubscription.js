const mongoose = require("mongoose");
const { Schema } = mongoose;

const Dao = require("./DAO");

const SubscriptionSchema = mongoose.model("Subscription", new Schema ({
    id: {type: String},
    fee: {type: Number},
    client: {
        id: {type: String},
        email: {type: String}
    },
    limit1: {type: Number},
    sessionCost: {type: Number}
}));

module.exports = class DaoSubscription extends Dao {
    async find(filter) {
        return await SubscriptionSchema.find(filter);
    }

    async save(object) {
        const schema = this.toMongoSchema(object);
        return await schema.save();
    }

    async delete(filter) {
        return await SubscriptionSchema.remove(filter);
    }

    async modify(filter, object) {
        const schema = await SubscriptionSchema.findOne(filter);

        schema.id = object.id;
        schema.fee = object.fee;
        schema.client = {
            email: object.client.email,
            id: object.client.id
        };
        schema.limit1 = object.limit;
        schema.sessionCost = object.sessionCost;
    }

    async getAll() {
        return await SubscriptionSchema.find({ });
    }

    toMongoSchema(object) {
        return new SubscriptionSchema({
            id: object.id,
            fee: object.fee,
            client: {
                email: object.client.email,
                id: object.client.id
            },
            limit1: object.limit,
            sessionCost: object.sessionCost
        });
    }
}

