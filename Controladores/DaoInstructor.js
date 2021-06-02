const mongoose = require("mongoose");
const { Schema } = mongoose;

const Dao = require("./DAO");

const InstructorSchema = mongoose.model("Instructor", new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true, minlength: 8},
    id: {type: String, unique: true},
    firstName: {type: String},
    lastName: {type: String},
    phone: {type: String},
    isTemp: {type: Boolean},
    room: {
        name: {type: String}
    },
    services: [{
        id: {type: Number}
    }],
    sessions: [{
        id: {type: Number}
    }]
}));

module.exports = class DaoInstructor extends Dao {
    async find(filter) {
        return await InstructorSchema.findOne(filter);
    }

    async save(object) {
        const schema = this.toMongoSchema(object);
        return await schema.save();
    }
    
    delete() {
        throw new Error("Abstract Method has no implementation");
    }

    modify() {
        throw new Error("Abstract Method has no implementation");
    }

    async getAll() {
        return await InstructorSchema.find({ });
    }

    toMongoSchema(object) {
        //Esto no funca tho
        const services1 = [];
        if (object.services.size > 0) {
            object.services.values().forEach(service => {
                services.push(service.getId());
            });
        }

        const sessions1 = [];
        if (object.sessions.size > 0) {
            object.sessions.values().forEach(session => {
                sessions.push(session.getId());
            });
        }

        return new InstructorSchema({
            email: object.email,
            password: object.password,
            id: object.id,
            firstName: object.firstName,
            lastName: object.lastName,
            phone: object.phone,
            isTemp: object.isTemp,
            room: {
                name: ""
            },
            services: services1,
            sessions: sessions1
        });
    }
}