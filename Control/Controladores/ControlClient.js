const bcrypt = require("bcryptjs");

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
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(object.password, salt);
        const client = this.factory.createUser(object.email, passwordHash, object.id, object.firstName, object.lastName, object.phone);
        if (object.status === "Al Dia") {
            client.setAlDia();
        } else {
            client.setMoroso();
        }

        const handler = new DaoClient();

        return await handler.save(client);
    }

    async setClientReservations(client, reservationArray) {
        const control = new ControlReservation();
        for (var i = 0; i < reservationArray.length; i++) {
            const reservationQuery = await control.find(reservationArray[i]);
            const reservation = control.toObject(reservationQuery[0]);
            client.addReservation(reservation);
        }
        return client;
    }

    async setClientSubscriptions(client, subscriptionArray) {
        const control = new ControlSubscription();
        for (var i = 0; i < subscriptionArray.length; i++) {
            const subscriptionQuery = await control.find(subscriptionArray[i]);
            const subscription = control.toObject(subscriptionQuery[0]);
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
        const session = await this.toObject(sessionQuery[0]);
        const reservation = new Reservation( 
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

    async paySubscription(idClient, idSubscription, amount) { //////
        const controlSubscription = new ControlSubscription();
        // const controlPayMethod = new ControlPayMethod();

        // Obtener Subscription de BD
        const query = {
            id: idSubscription,
            client: {id: idClient}
        };
        const subscriptioQuery = await controlSubscription.find(query);
        const subscription = await controlSubscription.toObject(subscriptioQuery[0]);

        // Obtener PaymentMethod de BD
        // const payMethodQuery = await controlPayMethod.find({id: idPayMethod});
        // const payMethod = await controlPayMethod.toObject(payMethodQuery[0]); 
        
        // reservation.setPaymentMethod(payMethod);
        subscription.pay(amount);

        return await controlSubscription.save(subscription);
    }

    async getClientReservations(idClient) {
        const controlReservation = new ControlReservation();
        return await controlReservation.find({client: idClient});
    }

    async getServices() {
        const controlService = new ControlService();
        return await controlService.getAll();
    }
}