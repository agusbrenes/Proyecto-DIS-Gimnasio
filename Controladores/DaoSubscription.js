const mongoose = require("mongoose");
const { Schema } = mongoose;

const Dao = require("./DAO");

const SubscriptionSchema = mongoose.model("Subscription", new Schema ({
    id: {type: String, required: true},
    fee: {type: Double},
    client: {
        email: {type: String},
        id: {type: String}
    },
    limit: {type: Integer},
    sessionCost: {type: Double}
}));

module.exports = class DaoSubscription extends Dao {
    async find(filter) {
        return await SubscriptionSchema.findOne(filter);
    }

    async save(object) {
        const schema = this.#toMongoSchema(object);
        return await schema.save();
    }

    delete() {
        throw new Error("Abstract Method has no implementation");
    }

    modify() {
        throw new Error("Abstract Method has no implementation");
    }

    #toMongoSchema(object) {
        return new SubscriptionSchema({
            id: object.id,
            fee: object.fee,
            client: {
                email: object.client.email,
                id: object.client.id
            },
            limit: object.limit,
            sessionCost: object.sessionCost
        });
    }
}

