const Session = require("./Session");
const SessionRegisterStrategy = require("./SessionRegisterStrategy");
const Status = require("./SessionStatus");

module.exports = class SessionRegisterAdmin extends SessionRegisterStrategy {    
    createSession(instructor, service, capacity, year, month, day, initialHour, totalHours) {
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
            Status.Authorized
        );
    }
}