const FactoryClient = require("../../Modelo/FactoryClient");
const Reservation = require("../../Modelo/Reservation");

const ControlUsers = require("./ControlUsers");
const ControlSubscription = require('./ControlSubscription');
const ControlReservation = require("./ControlReservation");
const ControlSession = require('./ControlSession');
const ControlService = require('./ControlService');
const ControlPayMethod = require('./ControlPayMethod');

const DaoClient = require("../Daos/DaoClient");

module.exports = class ControlClient extends ControlUsers {
    constructor() {
        super(new DaoClient());
        this.factory = new FactoryClient();
    }

    async toObject(schema) {
        let user = this.factory.createUser(
            schema.email,
            schema.password,
            schema.id,
            schema.firstName,
            schema.lastName,
            schema.phone
        );
        user = await this.setClientReservations(user, schema.reservations);
        user = await this.setClientSubscriptions(user, schema.subscriptions);
        return user;
    }

    async save(object) {
        const schema = await super.save(object);
        return this.toObject(schema);
    }

    async setClientReservations(client, reservationArray) {
        const control = new ControlReservation();
        for (var i = 0; i < reservationArray.length; i++) {
            const reservation = await control.find(reservationArray[i]);
            client.addReservation(reservation);
        }
        return client;
    }

    async setClientSubscriptions(client, subscriptionArray) {
        const control = new ControlSubscription();
        for (var i = 0; i < subscriptionArray.length; i++) {
            const subscription = await control.find(subscriptionArray[i]);
            client.addSubscription(subscription);
        }
        return client;
    }

    async reserveSession(idClient, idSession) {
        const controlSession = new ControlSession();
        const controlReservation = new ControlReservation();

        // Obtener Client de BD
        const clientQuery = await this.find({id: idClient});
        const client = await this.toObject(clientQuery[0]);

        // Obtener Session de BD
        const sessionQuery = await controlSession.find({id: idSession});
        const session = await this.toObject(sessionQuery[0]); //////
        const reservation = new Reservation( ///
            idClient, 
            idSession
        );

        client.addReservation(reservation);
        session.addReservation(reservation);

        await this.handler.save(client);
        await controlSession.save(session);
        return await controlReservation.save(reservation);
    }

    async payReservation(idClient, idSession, idPayMethod) {
        const controlReservation = new ControlReservation();
        const controlPayMethod = new ControlPayMethod();

        // Obtener Reservation de BD
        const query = {
            client: {id: idClient},
            session1: {id: idSession}
        };
        const reservationQuery = await controlReservation.find(query);
        const reservation = await controlReservation.toObject(reservationQuery[0]);

        // Obtener PaymentMethod de BD
        const payMethodQuery = await controlPayMethod.find({id: idPayMethod});
        const payMethod = await controlPayMethod.toObject(payMethodQuery[0]); 
        
        reservation.setPaymentMethod(payMethod);
        reservation.pay();

        return await controlReservation.save(reservation);
    }

    // async paySubscription(idClient, idSession, idPayMethod) {
    //     reservation = new Reservation(
    //         idClient, 
    //         idSession
    //     );
    //     return await this.handler.save(reservation);
    // }

    async getClientReservations(idClient) {
        const controlReservation = new ControlReservation();
        return await controlReservation.find({client: idClient});
    }

    async getServices() {
        const controlService = new ControlService();
        return await controlService.getAll();
    }
}