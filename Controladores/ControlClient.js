const FactoryClient = require("../Modelo/FactoryClient");
const Reservation = require("../Modelo/Reservation");
const ControlUsers = require("./ControlUsers");

const DaoClient = require("./DaoClient");
const DaoSession = require("./DaoSession");
const DaoSubscription = require('./DaoSubscription');
const DaoReservation = require('./DaoReservation');

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

    // async find(filter) {
    //     const schema = await super.find(filter);
    //     console.log(schema);
    //     return this.toObject(schema);
    // }

    async save(object) {
        const schema = await super.save(object);
        console.log('save');
        return this.toObject(schema);
    }

    async modify(filter, object) {
        const schema = await super.modify(filter, object);
        console.log('modify');
        return this.toObject(schema);
    }

    setClientReservations(client, reservationArray) {
        const handler = new DaoReservation();
        //const control = new ControlReservation(handler);
        for (var i = 0; i < reservationArray.length; i++) {
            const reservation = control.find(reservationArray[i]);
            client.addReservation(reservation);
        }
        return client;
    }

    setClientSubscriptions(client, subscriptionArray) {
        const handler = new DaoSubscription();
        //const control = new ControlSubscription(handler);
        for (var i = 0; i < subscriptionArray.length; i++) {
            const subscription = control.find(subscriptionArray[i]);
            client.addSubscription(subscription);
        }
        return client;
    }

    async reserveSession(idClient, idSession) {
        const reservation = new Reservation(
            idClient, 
            idSession
        );

        client.addReservation(reservation);
        session.addReservation(reservation);

        const daoClient = new DaoClient();
        const daoSession = new DaoSession();

        await daoClient.save(client);
        await daoSession.save(session);

        return await this.handler.save(reservation);
    }

    async payReservation(idClient, idSession, idPayMethod) {
        reservation = new Reservation(
            idClient, 
            idSession
        );
        return await this.handler.save(reservation);
    }
}