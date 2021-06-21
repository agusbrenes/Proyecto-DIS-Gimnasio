const Session = require("./Session");
const SessionRegisterStrategy = require("./SessionRegisterStrategy");
const Status = require("./SessionStatus");

module.exports = class SessionRegisterAdmin extends SessionRegisterStrategy {    
    createSession(instructor, service, capacity, month, day, initialHour, totalHours) {
        return new Session(
            instructor, 
            service, 
            capacity, 
            month, 
            day, 
            initialHour, 
            totalHours, 
            Status.Authorized
        );
    }
}