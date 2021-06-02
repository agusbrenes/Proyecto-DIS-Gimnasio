const mongoose = require("mongoose");
const { Schema } = mongoose;

const Dao = require("./DAO");

const ReservationSchema = mongoose.model("Reservation", new Schema ({
    id: {type: Number},
    client: {
        email: {type: String}
    },
    session: {
        id: {type: Number}
    },
    paymentMethod: {
        id: {type: Number}
    },
    isConfirmed: {type: Boolean}
}));