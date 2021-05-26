const mongoose = require("mongoose");
const { Schema } = mongoose;

const ClientSchema = new Schema({
    email: {type: String},
    password: {type: String, required: true, minlength: 8},
    id: {type: String},
    firstName: {type: String},
    lastName: {type: String},
    phone: {type: String},
    status: {type: String},
    reservations: [],
    subscriptions: []
});

module.exports = mongoose.model("Client", ClientSchema);