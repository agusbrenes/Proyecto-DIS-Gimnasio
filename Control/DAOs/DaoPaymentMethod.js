const mongoose = require("mongoose");
const { Schema } = mongoose;

const Dao = require("./DAO");

const PaymentMethodSchema = mongoose.model("PaymentMethod", new Schema({
    description: {type: String, index: true}
}));

module.exports = class DaoPaymentMethod extends Dao {
    async find(filter) {
        return await PaymentMethodSchema.find(filter);
    }

    async save(object) {
        const schema = this.toMongoSchema(object);
        return await schema.save();
    }

    async delete(filter) {
        return await PaymentMethodSchema.remove(filter);
    }

    async modify(filter, object) {
        const schema = await PaymentMethodSchema.findOne(filter);

        schema.description = object.description;

        return await PaymentMethodSchema.updateOne(filter, schema);
    }

    async getAll() {
        return await PaymentMethodSchema.find({ });
    }

    toMongoSchema(object) {
        return new PaymentMethodSchema({
            description: object.description
        });
    }
}