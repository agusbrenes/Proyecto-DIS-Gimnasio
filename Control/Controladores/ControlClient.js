const FactoryClient = require("../../Modelo/FactoryClient");
const Reservation = require("../../Modelo/Reservation");

const ControlUsers = require("./ControlUsers");
const ControlSubscription = require('./ControlSubscription');
const ControlReservation = require("./ControlReservation");
const ControlSession = require('./ControlSession');
const ControlService = require('./ControlService');

const DaoClient = require("../Daos/DaoClient");

module.exports = class ControlClient extends ControlUsers {
    constructor() {
        super(new DaoClient());
        this.factory = new FactoryClient();
    }

    toObject(schema) {
        let user = this.factory.createUser(
            schema.email,
            schema.password,
            schema.id,
            schema.firstName,
            schema.lastName,
            schema.phone
        );
        user = this.setClientReservations(user, schema.reservations);
        user = this.setClientSubscriptions(user, schema.subscriptions);
        return user;
    }

    async save(object) {
        const schema = await super.save(object);
        return this.toObject(schema);
    }

    setClientReservations(client, reservationArray) {
        const control = new ControlReservation();
        for (var i = 0; i < reservationArray.length; i++) {
            const reservation = control.find(reservationArray[i]);
            client.addReservation(reservation);
        }
        return client;
    }

    setClientSubscriptions(client, subscriptionArray) {
        const control = new ControlSubscription();
        for (var i = 0; i < subscriptionArray.length; i++) {
            const subscription = control.find(subscriptionArray[i]);
            client.addSubscription(subscription);
        }
        return client;
    }

    async reserveSession(idClient, idSession) {
        const controlSession = new ControlSession();
        const controlReservation = new ControlReservation();

        const clientQuery = await this.find({id: idClient});
        const client = clientQuery[0];
        const sessionQuery = await controlSession.find({id: idSession});
        const session = sessionQuery[0];
        const reservation = new Reservation(
            idClient, 
            idSession
        );

        client.addReservation(reservation);
        session.addReservation(reservation);

        await this.handler.save(client);
        await controlSession.save(session);
        return await controlReservation.save(session);
    }

    // async payReservation(idClient, idSession, idPayMethod) {
    //     reservation = new Reservation(
    //         idClient, 
    //         idSession
    //     );
    //     return await this.handler.save(reservation);
    // }

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