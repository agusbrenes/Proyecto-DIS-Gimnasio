const FactoryAdmin = require("../../Modelo/FactoryAdmin");
const Decorator = require("../../Modelo/Decorator");

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
        //console.log("Schema Admin Aux", schema);
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
    }

    async getCalendarSessions(dayNum, calendarSchema, instructorSchema) {
        const controlSession = new ControlSession();
        const controlInstructor = new ControlInstructor();
        const controlService = new ControlService();
        const controlRoom = new ControlRoom();
        const controlCalendar = new ControlCalendar();
        const decorator = new Decorator();

        const calendar = await controlCalendar.toObject(calendarSchema, controlRoom, this, controlSession, controlInstructor, controlService);
        const instructor = await controlInstructor.toObject(instructorSchema, controlRoom, this);

        const sessions = calendar.acceptVisit(instructor, dayNum);
        const decoratedSessions = decorator.decorate(sessions);
        return decoratedSessions;
    }

    async addSessiontoCalendar(sessionSchema) {
        const controlSession = new ControlSession();
        const controlInstructor = new ControlInstructor();
        const controlService = new ControlService();
        const controlRoom = new ControlRoom();
        const controlCalendar = new ControlCalendar();

        const query = {
            month: sessionSchema.schedule.month, 
            room: {
                schedule: {
                    initialHour: sessionSchema.room.schedule.initialHour, 
                    totalHours: sessionSchema.room.schedule.totalHours
                }, 
                name: sessionSchema.room.name
            }
        };
        const calendarQuery = await controlCalendar.find(query);  
        const calendar = await controlCalendar.toObject(calendarQuery[0], controlRoom, this, controlSession, controlInstructor, controlService); // tamos aqui
        
        const session = await controlSession.toAuxObject(sessionSchema, controlInstructor, controlService, controlRoom, this);
        
        calendar.addSession(session, session.getDay());
        return await controlCalendar.modify(query, calendar);
    }

    async authorizeSession(sessionSchema) {
        const controlSession = new ControlSession();
        const controlInstructor = new ControlInstructor();
        const controlService = new ControlService();
        const controlRoom = new ControlRoom();

        const session = await controlSession.toObject(sessionSchema, controlInstructor, controlService, controlRoom, this);
        session.authorize(sessionSchema.adminName);
        return await controlSession.modify(filter, session);
    }

    async addSessiontoService(sessionSchema) {
        const controlSession = new ControlSession();
        //console.log("Entra a addSessiontoService ???????????????? schema de session:", sessionSchema);
        const controlInstructor = new ControlInstructor();
        const controlService = new ControlService();
        const controlRoom = new ControlRoom();

        const query = {
            name: sessionSchema.service.name
        };
        const serviceQuery = await controlService.find(query);     
        const service = await controlService.toObject(serviceQuery[0], controlInstructor, controlRoom, this, controlSession);
        //console.log("Crea el Service", service, "SEssion schema", sessionSchema);
        const session = await controlSession.toAuxObject(sessionSchema, controlInstructor, controlService, controlRoom, this);
        //console.log("Crea el Session Aux", session);

        service.addSession(session, session.getDay());
        //console.log("Agrega la Session al Service", service);

        return await controlService.modify(query, service);
    }

}