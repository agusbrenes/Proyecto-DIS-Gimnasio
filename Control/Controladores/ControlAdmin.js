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

    async toObject(schema, controlSession, controlInstructor, controlService, controlRoom) {
        let user = this.factory.createUser(
            schema.email,
            schema.password,
            schema.id,
            schema.firstName,
            schema.lastName,
            schema.phone
        );
        user = await this.setAdminRoom(user, schema.room);
        user = await this.setAdminMessages(user, schema.messages, controlSession, controlInstructor, controlService, controlRoom);
        return user;
    }

    async toAuxObject(schema, controlSession, controlInstructor, controlService, controlRoom) {

        let user = this.factory.createUser(
            schema.email,
            schema.password,
            schema.id,
            schema.firstName,
            schema.lastName,
            schema.phone
        );
        user = await this.setAdminMessages(user, schema.messages, controlSession, controlInstructor, controlService, controlRoom);
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

    async setAdminMessages(user, messageArray, controlSession, controlInstructor, controlService, controlRoom) {
        for (var i = 0; i < messageArray.length; i++) {
            const sessionQuery = await controlSession.find(messageArray[i].session);
            const session = controlSession.toObject(sessionQuery[0], controlInstructor, controlService, controlRoom, this);
            user.addMessage(messageArray[i].msg, session);
        }
        return user;
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
        const instructor = await controlInstructor.toObject(instructorSchema, controlRoom, this, controlSession, controlService);
        
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
        
        const adminsInCharge = calendar.addSession(session, session.getDay());
        const admin = await this.toObject(adminsInCharge[0], controlSession, controlInstructor, controlService, controlRoom);
        const filter = {id: admin.id};
        await this.modify(filter, admin);

        return await controlCalendar.modify(query, calendar);
    }

    async replaceSessionInCalendar(oldSessionSchema, newSessionSchema) {
        const controlSession = new ControlSession();
        const controlInstructor = new ControlInstructor();
        const controlService = new ControlService();
        const controlRoom = new ControlRoom();
        const controlCalendar = new ControlCalendar();

        const query = {
            month: newSessionSchema.schedule.month, 
            room: {
                schedule: {
                    initialHour: newSessionSchema.room.schedule.initialHour, 
                    totalHours: newSessionSchema.room.schedule.totalHours
                }, 
                name: newSessionSchema.room.name
            }
        };
        const calendarQuery = await controlCalendar.find(query);  
        const calendar = await controlCalendar.toObject(calendarQuery[0], controlRoom, this, controlSession, controlInstructor, controlService); // tamos aqui
        
        // aqui con session, y usar old (poner arriba)
        const oldSession = await controlSession.toAuxObject(oldSessionSchema, controlInstructor, controlService, controlRoom, this);
        const newSession = await controlSession.toAuxObject(newSessionSchema, controlInstructor, controlService, controlRoom, this);
        
        calendar.addSession(oldSession, newSession, newSession.getDay());
        return await controlCalendar.modify(query, calendar);
    }

    async authorizeSession(sessionSchema) {
        const controlSession = new ControlSession();
        const controlInstructor = new ControlInstructor();
        const controlService = new ControlService();
        const controlRoom = new ControlRoom();

        const session = await controlSession.toObject(sessionSchema, controlInstructor, controlService, controlRoom, this);
        const auxInstructor = session.authorize(sessionSchema.adminName);

        const filterInstructor = {
            id: auxInstructor.id
        }
        const instructorSchema = await controlInstructor.find(filterInstructor);
        const instructor = await controlInstructor.toObject(instructorSchema, controlRoom, this, controlSession, controlService);
        
        await controlInstructor.modify(filterInstructor, instructor);

        const filter = {
            room: {
                schedule: {
                    initialHour: sessionSchema.room.schedule.initialHour,
                    totalHours: sessionSchema.room.schedule.totalHours,
                },
                name: sessionSchema.room.name,
                capacity: sessionSchema.room.capacity
            },
            year: sessionSchema.year,
            schedule: {
                month: sessionSchema.schedule.month,
                day: sessionSchema.schedule.day,
            }
        };

        return await controlSession.modify(filter, session);
    }

    // No se usa, obviado
    async addSessiontoService(sessionSchema) {
        const controlSession = new ControlSession();
        const controlInstructor = new ControlInstructor();
        const controlService = new ControlService();
        const controlRoom = new ControlRoom();

        const query = {
            name: sessionSchema.service.name
        };
        const serviceQuery = await controlService.find(query);     
        const service = await controlService.toObject(serviceQuery[0], controlInstructor, controlRoom, this, controlSession);
        const session = await controlSession.toAuxObject(sessionSchema, controlInstructor, controlService, controlRoom, this);

        service.addSession(session, session.getDay());

        return await controlService.modify(query, service);
    }

}