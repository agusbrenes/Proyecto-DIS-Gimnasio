const mongoose = require("mongoose");
const { Schema } = mongoose;

const Dao = require("./DAO");

const TempServiceSchema = new Schema({
    id: {type: Number, required: true}
});

const TempSessionSchema = new Schema({
    id: {type: Number, required: true}
});

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
    services: [TempServiceSchema],
    sessions: [TempSessionSchema]
}));

module.exports = class DaoInstructor extends Dao {
    async find(filter) {
        return await InstructorSchema.find(filter);
    }

    async save(object) {
        const schema = this.toMongoSchema(object);
        return await schema.save();
    }

    async delete(filter) {
        return await InstructorSchema.remove(filter);
    }

    async modify(id, object) {
        const schema = this.toMongoSchema(object);
        return await schema.save(id);
    }

    async getAll() {
        return await InstructorSchema.find({ });
    }

    toMongoSchema(object) {
        const services1 = [];
        if (object.services.length > 0) {
            object.services.values().forEach(service => {
                const schema = new TempServiceSchema({
                    id: service.id
                });
                services1.push(schema);
            });
        }

        const sessions1 = [];
        if (object.sessions.length > 0) {
            object.sessions.values().forEach(session => {
                const schema = new TempSessionSchema({
                    id: session.id
                });
                sessions1.push(schema);
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