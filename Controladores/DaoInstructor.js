const mongoose = require("mongoose");
const { Schema } = mongoose;

const Dao = require("./DAO");

const InstructorSchema = mongoose.model("Instructor", new Schema({
    email: {type: String, index: true},
    password: {type: String, required: true, minlength: 8},
    id: {type: String, index: true},
    firstName: {type: String},
    lastName: {type: String},
    phone: {type: String},
    isTemp: {type: Boolean},
    room: {
        name: {type: String, unique: true}
    },
    services: [{
        id: {type: Number, unique: true}
    }],
    sessions: [{
        id: {type: Number, unique: true}
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

    async delete(filter) {
        return await InstructorSchema.remove(filter);
    }

    async modify(id, object){
        const schema = this.toMongoSchema(object);
        return await schema.save(id);
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