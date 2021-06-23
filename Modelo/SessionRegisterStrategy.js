module.exports = class SessionRegisterStrategy {    
    createSession(instructor, service, room, capacity, month, day, initialHour, totalHours) {
        throw new Error("Cannot call abstract method 'createSession'. Instance a concrete SessionRegisterStrategy to call createSession().");
    }
}