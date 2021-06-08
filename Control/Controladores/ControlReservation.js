const Reservation = require("../../Modelo/Reservation");
const Controller = require("./Controller");

const DaoReservation = require('../Daos/DaoReservation');

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
}