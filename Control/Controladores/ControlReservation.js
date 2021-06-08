const Reservation = require("../../Modelo/Reservation");
const Controller = require("./Controller");
const ControlClient = require('./ControlClient');

const DaoReservation = require('../Daos/DaoReservation');
const ControlSession = require("./ControlSession");
const ControlPayMethod = require("./ControlPayMethod");

module.exports = class ControlReservation extends Controller {
    constructor() {
        super(new DaoReservation());
    }

    async save(object) {
        const reservation = new Reservation (
            object.client,
            object.session
        );
        return await this.handler.save(reservation);
    }

    async toObject(schema) {
        const controlClient = new ControlClient();
        const controlSession = new ControlSession();

        const clientQuery = await controlClient.find({id: schema.client.id});
        const client = await controlClient.toObject(clientQuery[0]);
        const sessionQuery = await controlSession.find({id: idSession});
        const session = await controlSession.toObject(sessionQuery[0]); 

        let reservation = new Reservation (
            client,
            session
        );
        reservation.setId(schema.id);
        reservation = await this.setPaymentMethod(reservation, schema.paymentMethod);
        return reservation;
    }

    async setPaymentMethod(reservation, paymentMethod) {
        const control = new ControlPayMethod();
        const payMethodQuery = await control.find({id: paymentMethod.id});
        const method = payMethodQuery[0];
        reservation.setAdmRoom(method);
        return reservation;
    }
}