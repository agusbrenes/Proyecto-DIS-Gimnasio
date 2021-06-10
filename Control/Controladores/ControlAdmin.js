const FactoryAdmin = require("../../Modelo/FactoryAdmin");

const ControlRoom = require("./ControlRoom");
const ControlUsers = require("./ControlUsers");

const DaoAdmin = require("../Daos/DaoAdmin");

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
        user = await this.setAdminRoom(user, schema.admRoom);
        return user;
    }

    async save(object) {
        const schema = await super.save(object);
        return this.toObject(schema);
    }

    async setAdminRoom(admin, adminRoom) {
        const control = new ControlRoom();

        const roomQuery = await control.find({admRoom: adminRoom.roomName});
        const room = control.toObject(roomQuery[0]);

        admin.setAdmRoom(room);
        return admin;
    }

}