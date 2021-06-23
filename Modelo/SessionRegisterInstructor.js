const Session = require("./Session");
const SessionRegisterStrategy = require("./SessionRegisterStrategy");
const Status = require("./SessionStatus");

module.exports = class SessionRegisterInstructor extends SessionRegisterStrategy {    
    createSession(instructor, service, room, capacity, year, month, day, initialHour, totalHours) {
        return new Session(
            instructor, 
            service, 
            room,
            capacity, 
            year,
            month, 
            day, 
            initialHour, 
            totalHours, 
            Status.StandBy
        );
    }
}