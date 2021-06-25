const bcrypt = require("bcryptjs");

const FactoryInstructor = require("../../Modelo/FactoryInstructor");

const ControlRoom = require("./ControlRoom");
const ControlService = require("./ControlService");
const ControlSession = require("./ControlSession");
const ControlUsers = require("./ControlUsers");

const DaoInstructor = require("../Daos/DaoInstructor");

module.exports = class ControlInstructor extends ControlUsers {
    constructor() {
        super(new DaoInstructor());
        this.factory = new FactoryInstructor();
    }

    async toObject(schema, controlRoom, controlAdmin) {
        let user = this.factory.createUser(
            schema.email,
            schema.password,
            schema.id,
            schema.firstName,
            schema.lastName,
            schema.phone
        );
        user.setTemp(schema.isTemp);
        user = await this.setInstructorRoom(user, schema.room, controlRoom, controlAdmin);
        // user = await this.setInstructorServices(user, schema.services);
        // user = await this.setInstructorSessions(user, schema.sessions);
        return user;
    }

    async toAuxObject(schema) {
        let user = this.factory.createUser(
            schema.email,
            schema.password,
            schema.id,
            schema.firstName,
            schema.lastName,
            schema.phone
        );
        user.setTemp(schema.isTemp);
        return user;
    }

    async save(object) {
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(object.password, salt);
        const instructor = this.factory.createUser(object.email, passwordHash, object.id, object.firstName, object.lastName, object.phone);
        instructor.setRoom(object.room);
        instructor.setTemp(object.isTemp);

        const handler = new DaoInstructor();

        return await handler.save(instructor);
    }

    async setInstructorRoom(instructor, instructorRoom, controlRoom, controlAdmin) {
        const roomQuery = await controlRoom.find({name: instructorRoom.name});
        const room = await controlRoom.toAuxObject(roomQuery[0], controlAdmin); // falta toObject
        instructor.setRoom(room);
        return instructor;
    }

    // Ya no se usa
    async setInstructorServices(instructor, serviceArray) {
        for (var i = 0; i < serviceArray.length; i++) {
            const serviceQuery = await control.find(serviceArray[i]);
            const service = await control.toAuxObject(serviceQuery[0]);
            instructor.addService(service);
        }
        return instructor;
    }

    // Puede que no se use????
    async setInstructorSessions(instructor, sessionArray, controlSession, controlInstructor, controlService, controlRoom, controlAdmin) {
        for (var i = 0; i < sessionArray.length; i++) {
            const sessionQuery = await controlSession.find(sessionArray[i]);
            const session = await controlSession.toAuxObject(sessionQuery[0], controlInstructor, controlService, controlRoom, controlAdmin);
            instructor.addSession(session);
        }
        return instructor;
    }

    async addServiceInstructor(idInstructor, serviceName) {
        const controlService = new ControlService();

        // Obtener Instructor de BD
        const instructorQuery = await this.find({id: idInstructor});
        const instructor = await this.toAuxObject(instructorQuery[0]);

        const serviceQuery = await controlService.find({name: serviceName});
        const service = await controlService.toAuxObject(serviceQuery[0]);

        instructor.addService(service);
        service.addInstructor(instructor);

        await controlService.save(service);
        return await this.handler.save(instructor);
    }
}