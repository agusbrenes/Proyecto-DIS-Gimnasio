const mongoose = require("mongoose");
const { Schema } = mongoose;

const Dao = require("./DAO");

const AdminSchema = mongoose.model("Admin", new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true, minlength: 8},
    id: {type: String, unique: true},
    firstName: {type: String},
    lastName: {type: String},
    phone: {type: String},
    admRoom: {
        roomName: {type: String}
    }
}));

module.exports = class DaoAdmin extends Dao {
    async find(filter) {
        return await AdminSchema.findOne(filter);
    }

    async save(object) {
        const schema = this.toMongoSchema(object);
        return await schema.save();
    }

    delete() {
        throw new Error("Abstract Method has no implementation");
    }

    modify() {
        throw new Error("Abstract Method had no implementation");
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