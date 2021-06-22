const mongoose = require("mongoose");
const { Schema } = mongoose;

const Dao = require("./DAO");

const TempReservationSchema = new Schema({
    session: {
        instructor: {
            id: {type: String},
            firstName: {type: String},
            lastName: {type: String}
        },
        service: {
            name: {type: String}
        }
    },
    paymentMethod: {
        name: {type: String}
    },
    isConfirmed: {type: Boolean}
}, { _id: false });

const TempSubscriptionSchema = new Schema({
    fee: {type: Number},
    limit: {type: Number}
}, { _id: false });

const ClientSchema = mongoose.model("Client", new Schema({
    email: {type: String, index: true},
    password: {type: String, required: true, minlength: 8},
    id: {type: String, index: true},
    firstName: {type: String},
    lastName: {type: String},
    phone: {type: String},
    status: {type: String},
    reservations: [TempReservationSchema],
    subscriptions: [TempSubscriptionSchema]
}));

module.exports = class DaoClient extends Dao {

    async find(filter) {
        return await ClientSchema.find(filter);
    }

    async save(object) {
        const schema = this.toMongoSchema(object);
        return await schema.save();
    }

    async delete(filter) {
        return await ClientSchema.remove(filter);
    }

    async modify(filter, object){
        const schema = await ClientSchema.findOne(filter);

        schema.email = object.email;
        if (!(object.password.length === 0)) {
            schema.password = object.password;
        }
        schema.id = object.id;
        schema.firstName = object.firstName;
        schema.lastName = object.lastName;
        schema.phone = object.phone;
        schema.status = object.status;

        const reservations1 = [];
        if (object.reservations.length > 0) {
            object.reservations.forEach(reservation => {
                const schema1 = { 
                    session: {
                        instructor: {
                            id: reservation.session.instructor.id,
                            firstName: reservation.session.instructor.firstName,
                            lastName: reservation.session.instructor.lastName
                        },
                        service: {
                            name: reservation.session.service.name
                        }
                    },
                    paymentMethod: {
                        name: reservation.paymentMethod.name
                    },
                    isConfirmed: reservation.isConfirmed
                };
                reservations1.push(schema1);
            });
            schema.reservations = reservations1;
        }
        const subscriptions1 = [];
        if (object.subscriptions.length > 0) {
            object.subscriptions.forEach(subscription => {
                const schema1 = { 
                    fee: subscription.fee,
                    limit: subscription.limit 
                };
                subscriptions1.push(schema1);
            });
            schema.subscriptions = subscriptions1;
        }

        return await ClientSchema.updateOne(filter, schema);
    }

    async getAll() {
        return await ClientSchema.find({ });
    }

    toMongoSchema(object) {
        const reservations1 = [];
        if (object.reservations.length > 0) {
            object.reservations.forEach(reservation => {
                const schema = { 
                    session: {
                        instructor: {
                            id: reservation.session.instructor.id,
                            firstName: reservation.session.instructor.firstName,
                            lastName: reservation.session.instructor.lastName
                        },
                        service: {
                            name: reservation.session.service.name
                        }
                    },
                    paymentMethod: {
                        name: reservation.paymentMethod.name
                    },
                    isConfirmed: reservation.isConfirmed
                };
                reservations1.push(schema);
            });
        }
        const subscriptions1 = [];
        if (object.subscriptions.length > 0) {
            object.subscriptions.forEach(subscription => {
                const schema = { 
                    fee: subscription.fee,
                    limit: subscription.limit 
                };
                subscriptions1.push(schema);
            });
        }
        return new ClientSchema({
            email: object.email,
            password: object.password,
            id: object.id,
            firstName: object.firstName,
            lastName: object.lastName,
            phone: object.phone,
            status: object.status,
            reservations: reservations1,
            subscriptions: subscriptions1
        });
    }    
}