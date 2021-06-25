const User = require('./user');

module.exports = class Instructor extends User {
    constructor(email, password, id, firstName, lastName, phone) {
        super(email, password, id, firstName, lastName, phone);
        this.isTemp = false;
        this.room = null;
        this.services = [];
        this.sessions = [];
    }

    isTemp() {
        return this.isTemp;
    }
    
    setTemp() {
        this.isTemp = true;
    }

    setDefault() {
        this.isTemp = false;
    }
    
    setRoom(room) {
        this.room = room;
    }

    getRoom() {
        return this.room;
    }

    addService(service) {
        if(!this.services.includes(service.getId())) {
            this.services.push(service);
        }
    }

    getService(id) {
        let serv = this.services.find(service => service.getId() == id);
        return serv;
    }

    addSession(session) {
        if(!this.sessions.includes(session.getId())) {
            this.sessions.push(session);
        }
    }

    getSession(id) {
        let sess = this.sessions.find(session => session.getId() == id);
        return sess;
    }

    updateSession(adminName, incomingSession) {
        if (this.sessions.length > 0) {
            this.sessions.forEach(session => {
                if (session.schedule.month == incomingSession.schedule.month && 
                    session.schedule.day === incomingSession.schedule.day && 
                    session.schedule.initialHour === incomingSession.schedule.initialHour && 
                    session.schedule.totalHours === incomingSession.schedule.totalHours) {

                        session.status = incomingSession.status;

                    }
            });
        }
        
        var message = adminName + " has modified the status of the session scheduled to day: " + incomingSession.schedule.day + ", month: " + incomingSession.schedule.month + ", starting at: " + incomingSession.schedule.initialHour + ", duration: " + incomingSession.schedule.totalHours;
        var info = {
            msg: message,
            session: incomingSession
        }

        this.messages.push(info);
    }

    visitMySessions(month, year, day) {
        if (this.room !== null) {
            if (this.room.calendars.length > 0) {
                let calendar = this.room.getCalendar(year, month);
                let daySchedules = calendar.sessions.get(day); //Esto es un map.

                var mySessions = [];

                daySchedules.forEach((sessionArray) => {
                    if (sessionArray.length > 0) {
                        sessionArray.forEach(session => {
                            if (session.instructor.id === this.id) {
                                mySessions.push(session);
                            }
                        });
                    }
                });
                return mySessions;
            }
        }
        return [];
    }

    visitOtherSessions(month, year, day) {
        if (this.room !== null) {
            if (this.room.calendars.length > 0) {
                let calendar = this.room.getCalendar(year, month);
                let daySchedules = calendar.sessions.get(day); //Esto es un map.

                var notMySessions = [];

                daySchedules.forEach((sessionArray) => {
                    if (sessionArray.length > 0) {
                        sessionArray.forEach(session => {
                            if (session.instructor.id == this.id) {
                                notMySessions.push(session);
                            }
                        });
                    }
                });

                return notMySessions;
            }
        }
        return [];
    }

    visitFreeSpaces(month, year, day) {
        if (this.room !== null) {
            if (this.room.calendars.length > 0) {
                let calendar = this.room.getCalendar(year, month);
                let daySchedules = calendar.sessions.get(day); //Esto es un map.

                var freeSpaces = [];

                daySchedules.forEach((sessionArray, key) => {
                    if (sessionArray.length === 0) {
                        let value = {
                            startHour: key.startHour,
                            endHour: key.endHour
                        };
                        freeSpaces.push(value);
                    }
                });

                return freeSpaces;
            }
        }
        return [];
    }
}