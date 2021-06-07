const FactoryClient = require("../Modelo/FactoryClient");
const Reservation = require("../Modelo/Reservation");
const ControlUsers = require("./ControlUsers");
const ControlSubscription = require('./ControlSubscription');
const ControlReservation = require("./ControlReservation");

module.exports = class ControlClient extends ControlUsers {
    constructor(handler) {
        super(handler);
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

    // async modify(filter, object) {
    //     const schema = await super.modify(filter, object);
    //     return this.toObject(schema);
    // }

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

        const client = this.find({id: idClient});
        const session = controlSession.find({id: idSession});
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
}