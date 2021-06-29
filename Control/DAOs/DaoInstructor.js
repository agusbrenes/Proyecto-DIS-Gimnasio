const mongoose = require("mongoose");
const { Schema } = mongoose;

const Dao = require("./DAO");

const TempServiceSchema = new Schema({
    name: {type: String, required: true}
}, { _id: false });

const TempSessionSchema = new Schema({
    service: {
        name: {type: String}
    },
    schedule: {
        month: {type: Number},
        day: {type: Number}
    },
    plan: {
        initialHour: {type: Number},
        totalHours: {type: Number}
    }
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
        name: {type: String}
    },
    services: [TempServiceSchema],
    sessions: [TempSessionSchema],
    messages:  [{
        msg: {type: String}
    }]
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

    async modify(filter, object, passwordFlag = false) {
        const schema = await InstructorSchema.findOne(filter);

        schema.email = object.email;
        if (passwordFlag === true) {
            schema.password = object.password;
        }
        schema.id = object.id;
        schema.firstName = object.firstName;
        schema.lastName = object.lastName;
        schema.phone = object.phone;
        schema.isTemp = object.isTemp;

        const services1 = [];
        if (object.services.length > 0) {
            object.services.forEach(service => {
                const schema1 = { 
                    name: service.name 
                };
                services1.push(schema1);
            });
            schema.services = services1;
        }

        const sessions1 = [];
        if (object.sessions.length > 0) {
            object.sessions.forEach(session => {
                const schema1 = { 
                    service: {
                        name: session.service.name
                    },
                    schedule: {
                        month: session.schedule.month,
                        day: session.schedule.day
                    },
                    plan: {
                        initialHour: session.schedule.initialHour,
                        totalHours: session.schedule.totalHours
                    }
                };
                sessions1.push(schema1);
            });
            schema.sessions = sessions1;
        }

        const messages1 = [];
        if (object.messages.length > 0) {
            object.messages.forEach(messageN => {
                const schema1 = {
                    msg: messageN.msg
                }
                schema.messages.push(schema1);
            });
            //schema.messages = messages1;
        }

        return await InstructorSchema.updateOne(filter, schema);
    }

    async getAll() {
        return await InstructorSchema.find({ });
    }

    toMongoSchema(object) {
        const services1 = [];
        if (object.services.length > 0) {
            object.services.forEach(service => {
                const schema = { 
                    name: service.name 
                };
                services1.push(schema);
            });
        }

        const sessions1 = [];
        if (object.sessions.length > 0) {
            object.sessions.forEach(session => {
                const schema = { 
                    service: {
                        name: session.service.name
                    },
                    schedule: {
                        month: session.schedule.month,
                        day: session.schedule.day
                    },
                    plan: {
                        initialHour: session.plan.initialHour,
                        totalHours: session.plan.totalHours
                    }
                };
                sessions1.push(schema);
            });
        }

        const messages1 = [];
        if (object.messages.length > 0) {
            object.messages.forEach(messageN => {
                const schema1 = {
                    msg: messageN.msg,
                    session: {
                        service: {
                            name: messageN.session.service.name
                        },
                        schedule: {
                            month: messageN.session.schedule.month,
                            day: messageN.session.schedule.day
                        },
                        plan: {
                            initialHour: messageN.session.plan.initialHour,
                            totalHours: messageN.session.plan.totalHours
                        }
                    }
                }
                messages1.push(schema1);
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
            sessions: sessions1,
            messages: messages1
        });
    }
}