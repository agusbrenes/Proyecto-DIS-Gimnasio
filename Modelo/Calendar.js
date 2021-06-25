module.exports = class Calendar {
    constructor(room, month, year) {
        if (month > 12) {
            throw new Error("Invalid Month number. Cannot create Calendar without valid Month number.");
        }
        this.room = room;
        this.month = month;        
        this.monthName = this.setMonthName();
        this.year = year;
        this.days = new Map();
        this.sessions = new Map();
        this.setDays();
    }

    setRoom(room) {
        this.room = room;
    }

    getRoom() {
        return this.room;
    }

    setMonth(month) {
        this.month = month;
        this.monthName = this.setMonthName();
    }

    getMonth() {
        return this.month;
    }

    getMonthName() {
        return this.monthName;
    }

    setYear(year) {
        this.year = year;
    }

    getYear() {
        return this.year;
    }
    
    getDays() {
        return this.days;
    }

    getDay(num) {
        return this.days[num];
    }

    setMonthName() {
        switch (this.month) {
            case 0:
                return "Enero";
            case 1:
                return "Febrero";
            case 2:
                return "Marzo";
            case 3:
                return "Abril";
            case 4:
                return "Mayo";
            case 5:
                return "Junio";
            case 6:
                return "Julio";
            case 7:
                return "Agosto";
            case 8:
                return "Setiembre";
            case 9:
                return "Octubre";
            case 10:
                return "Noviembre";
            case 11:
                return "Diciembre";
            default:
                throw new Error("Invalid Month number. Cannot create Calendar without valid Month number.");
        }
    }

    setDays() {
        const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
        for (var dayNum = 0; dayNum < 7; dayNum++) {
            this.days.set(dayNum, days[dayNum]);
            this.sessions.set(dayNum, []);
        }        
    }

    addSession(session, dayNum) {
        if (dayNum < 0 || dayNum > 6) {
            throw new Error("Invalid day number. Please choose a valid day.");
        } else if (sessionScheduleCollides(dayNum, session.schedule)) {
            print();
        }
        var daySessions = this.sessions.get(dayNum);
        daySessions.push(session);

        let instructorName = session.instructor.firstName + " " + session.instructor.lastName;

        this.notify(instructorName);
    }

    sessionScheduleCollides(dayNum, schedule) {
        var daySessions = this.sessions.get(dayNum);
        if (daySessions.length > 0) {
            daySession.forEach(session => {
                if (schedulesCollidese(session.schedule, schedule)) {
                    return true;
                }
            });
        }
        return false;
    }

    schedulesCollidese(schedule1, schedule2) {
        const firstSchedule = (schedule1.initialHour < schedule2.initialHour ? schedule1 : schedule2);
        const secondSchedule = (firstSchedule === schedule1 ? schedule2 : schedule1);        
        const lastHour = firstSchedule.initialHour + firstSchedule.totalHours - 1;
        if (lastHour < secondSchedule.initialHour) {
            return false;
        } else {
            return true;
        }
    }

    notify(instructorName) {
        this.room.updateCalendar(instructorName, this);
    }

    acceptVisit(instructorVisitor, month, year, day) {
        var listOfSessions = [];
        listOfSessions.push(instructorVisitor.visitMySessions(month, year, day));
        listOfSessions.push(instructorVisitor.visitOtherSessions(month, year, day));

        //[[mySessions],[otherSessions]]
        return listOfSessions;
    }
}