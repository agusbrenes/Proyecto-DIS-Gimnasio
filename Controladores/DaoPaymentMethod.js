const mongoose = require("mongoose");
const { Schema } = mongoose;

const Dao = require("./DAO");

const PaymentMethodSchema = mongoose.model("PaymentMethod", new Schema({
    id: {type: Number},
    description: {type: String}
}));

module.exports = class DaoPaymentMethod extends Dao {
    async find(filter) {
        return await PaymentMethodSchema.findOne(filter);
    }

    async save(object) {
        const schema = this.toMongoSchema(object);
        return await schema.save();
    }

    async delete(filter) {
        return await PaymentMethodSchema.remove(filter);
    }

    async modify(id, object) {
        const schema = this.toMongoSchema(object);
        return await schema.save(id);
    }

    toMongoSchema(object) {
        return new PaymentMethodSchema({
            id: object.id,
            description: object.description
        });
    }
}