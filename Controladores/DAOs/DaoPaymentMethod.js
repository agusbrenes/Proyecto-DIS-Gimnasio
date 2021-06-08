const mongoose = require("mongoose");
const { Schema } = mongoose;

const Dao = require("./DAO");

const PaymentMethodSchema = mongoose.model("PaymentMethod", new Schema({
    id: {type: Number, index: true},
    description: {type: String, unique: true}
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
        const schema = PaymentMethodSchema.findOne(filter);

        schema.id = object.id;
        schema.description = object.description;

        return await PaymentMethodSchema.updateOne(filter, schema);
    }

    async getAll() {
        return await PaymentMethodSchema.find({ });
    }

    toMongoSchema(object) {
        return new PaymentMethodSchema({
            id: object.id,
            description: object.description
        });
    }
}