const mongoose = require("mongoose");
const { Schema } = mongoose;

const AdminSchema = new Schema({
    email: {type: String},
    password: {type: String, required: true, minlength: 8},
    id: {type: String},
    firstName: {type: String},
    lastName: {type: String},
    phone: {type: String}
});

/*
const AdminSchema = new Schema({
    email: {type: String},
    password: {type: String, required: true, minlength: 8},
    id: {type: String},
    firstName: {type: String},
    lastName: {type: String},
    phone: {type: String},
    admRoom: RoomSchema
});
*/

const RoomSchema = new Schema({
    name: {type: String},
    max_capacity: {type: Number},
    capacity: {type: Number},
    schedule: {type: Date},
    administrators: [AdminSchema],
    instructors: [],
    services: [],
    calendars: []
});

/*
const RoomSchema = new Schema({
    name: {type: String},
    max_capacity: {type: Number},
    capacity: {type: Number},
    schedule: ScheduleSchema,
    administrators: [AdminSchema],
    instructors: [InstructorSchema],
    services: [ServiceSchema],
    calendars: [CalendarSchema]
});
*/

//mongoose.exports = mongoose.model("Room", RoomSchema);

module.exports = mongoose.model("Admin", AdminSchema);