const mongoose = require("mongoose");
const { Schema } = mongoose;

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

module.exports = mongoose.model("Room", RoomSchema);