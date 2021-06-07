const FactoryAdmin = require("../Modelo/FactoryAdmin");
const ControlRoom = require("./ControlRoom");

module.exports = class ControlAdmin extends ControlUsers {
    constructor(handler) {
        super(handler);
        this.factory = new FactoryAdmin();
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
        user = this.setAdminRoom(user, schema.room);
        return user;
    }

    async save(object) {
        const schema = await super.save(object);
        return this.toObject(schema);
    }

    setAdminRoom(admin, adminRoom) {
        const control = new ControlRoom();
        const roomQuery = control.find({admRoom: adminRoom.roomName});
        const room = roomQuery[0];
        admin.setAdmRoom(room);
        return admin;
    }

}