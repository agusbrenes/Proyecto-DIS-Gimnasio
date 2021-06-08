const mongoose = require("mongoose");
const { Schema } = mongoose;

const Dao = require("./DAO");

const TempServiceSchema = new Schema({
    id: {type: Number, required: true}
}, { _id: false });

const TempSessionSchema = new Schema({
    id: {type: Number, required: true}
}, { _id: false });

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

    async modify(filter, object) {
        const schema = InstructorSchema.findOne(filter);

        schema.email = object.email;
        if (!(object.password.length === 0)) {
            schema.password = object.password;
        }
        schema.id = object.id;
        schema.firstName = object.firstName;
        schema.lastName = object.lastName;
        schema.phone = object.phone;
        schema.isTemp = object.isTemp;

        const services1 = [];
        if (object.services.length > 0) {
            object.services.values().forEach(service => {
                const schema1 = new TempServiceSchema({
                    id: service.id
                });
                services1.push(schema1);
            });
            schema.services = services1;
        }

        const sessions1 = [];
        if (object.sessions.length > 0) {
            object.sessions.values().forEach(session => {
                const schema1 = new TempSessionSchema({
                    id: session.id
                });
                sessions1.push(schema1);
            });
            schema.sessions = sessions1;
        }

        return await InstructorSchema.updateOne(filter, schema);
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
                name: object.room.name
            },
            services: services1,
            sessions: sessions1
        });
    }
}