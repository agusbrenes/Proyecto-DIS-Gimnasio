const mongoose = require("mongoose");
const Admin = require("../Modelo/Admin");
const { Schema } = mongoose;

const Dao = require("./DAO");

const AdminSchema = mongoose.model("Admin", new Schema({
    email: {type: String, index: true},
    password: {type: String, required: true, minlength: 8},
    id: {type: String, index: true},
    firstName: {type: String},
    lastName: {type: String},
    phone: {type: String},
    admRoom: {
        roomName: {type: String, unique: true}
    }
}));

module.exports = class DaoAdmin extends Dao {
    async find(filter) {
        return await AdminSchema.find(filter);
    }

    async save(object) {
        const schema = this.toMongoSchema(object);
        return await schema.save();
    }

    async delete(filter) {
        return await AdminSchema.remove(filter);
    }

    async modify(filter, object) {
        const schema = await AdminSchema.findOne(filter);

        schema.email = object.email;
        if (!(object.password.length === 0)) {
            schema.password = object.password;
        }
        schema.id = object.id;
        schema.firstName = object.firstName;
        schema.lastName = object.lastName;
        schema.phone = object.phone;
        schema.admRoom.roomName = object.admRoom.name;

        return await AdminSchema.updateOne(filter, schema);
    }

    async getAll() {
        return await AdminSchema.find({ });
    }

    toMongoSchema(object) {
        return new AdminSchema({
            email: object.email,
            password: object.password,
            id: object.id,
            firstName: object.firstName,
            lastName: object.lastName,
            phone: object.phone,
            admRoom: {
                roomName: ""
            }
        });
    }
}