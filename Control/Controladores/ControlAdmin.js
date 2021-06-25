const FactoryAdmin = require("../../Modelo/FactoryAdmin");

const ControlRoom = require("./ControlRoom");
const ControlUsers = require("./ControlUsers");

const DaoAdmin = require("../Daos/DaoAdmin");
const ControlSession = require("./ControlSession");
const ControlCalendar = require("./ControlCalendar");
const ControlService = require("./ControlService");
const ControlInstructor = require("./ControlInstructor");

module.exports = class ControlAdmin extends ControlUsers {
    constructor() {
        super(new DaoAdmin());
        this.factory = new FactoryAdmin();
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
        user = await this.setAdminRoom(user, schema.room);
        return user;
    }

    async toAuxObject(schema) {
        console.log("Schema Admin Aux", schema);
        let user = this.factory.createUser(
            schema.email,
            schema.password,
            schema.id,
            schema.firstName,
            schema.lastName,
            schema.phone
        );
        return user;
    }

    async save(object) {
        const schema = await super.save(object);
        return this.toObject(schema);
    }

    async setAdminRoom(admin, adminRoom) {
        const control = new ControlRoom();

        const roomQuery = await control.find({name: adminRoom.name});
        const room = await control.toAuxObject(roomQuery[0], this);

        admin.setRoom(room);
        return admin;
    }

    async getAdminRoom(idAdmin) {
        const control = new ControlRoom();

        const admin = await this.find(idAdmin);
        
        return await control.find({name: admin.room.name});
        // const roomQuery = await control.find({room: adminRoom.roomName});
        // const room = control.toObject(roomQuery[0]);
    }

    async addSessiontoCalendar(sessionSchema) {
        /* To create Session Object */
        // Primary
        const controlSession = new ControlSession();
        // Secondary
        const controlInstructor = new ControlInstructor();
        const controlService = new ControlService();
        const controlRoom = new ControlRoom();
        
        /* To create Calendar Object */
        // Primary
        const controlCalendar = new ControlCalendar();
        // controlRoom

        const query = {
            room: {
                name: sessionSchema.room.name
            },
            month: sessionSchema.schedule.month,
            year: sessionSchema.year
        };
        const calendarQuery = await controlCalendar.find(query);     
        const calendar = await controlCalendar.toObject(calendarQuery[0], controlRoom, this, controlSession, controlInstructor, controlService);
        
        const session = await controlSession.toAuxObject(sessionSchema, controlInstructor, controlService, controlRoom, this);
        
        calendar.addSession(session, session.getDay());

        return await controlCalendar.modify(query, calendar);
    }

    async addSessiontoService(sessionSchema) {
        const controlSession = new ControlSession();
        console.log("Entra a addSessiontoService ????????????????");
        const controlInstructor = new ControlInstructor();
        const controlService = new ControlService();
        const controlRoom = new ControlRoom();

        const query = {
            name: sessionSchema.service.name
        };
        const serviceQuery = await controlService.find(query);     
        const service = await controlService.toObject(serviceQuery[0], controlInstructor, controlRoom, this, controlSession);
        console.log("Crea el Service", service);
        const session = await controlSession.toAuxObject(sessionSchema, controlInstructor, controlService, controlRoom, this);
        console.log("Crea el Session Aux", session);

        service.addSession(session, session.getDay());
        console.log("Agrega la Session al Service", service);

        return await controlService.modify(query, service);
    }

}