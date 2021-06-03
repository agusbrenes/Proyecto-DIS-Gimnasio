const mongoose = require("mongoose");
const { Schema } = mongoose;

const Dao = require("./DAO");

const SubscriptionSchema = mongoose.model("Subscription", new Schema ({
    id: {type: String, index: true},
    fee: {type: Number},
    client: {
        id: {type: String, unique: true},
        email: {type: String, unique: true}
    },
    limit: {type: Number},
    sessionCost: {type: Number}
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

