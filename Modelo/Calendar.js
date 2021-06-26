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
        this.setSchedules();
    }

    setDays() {
        const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
        for (var dayNum = 0; dayNum < 7; dayNum++) {
            this.days.set(dayNum, days[dayNum]);
            this.sessions.set(dayNum, new Map());
        }
    }

    setSchedules() {
        for (var i = 0; i < 7; i++) {
            var mapping = this.sessions.get(i);
            for (var start = this.room.schedule.initialHour; start < (this.room.schedule.initialHour + this.room.schedule.totalHours); start++) {
                let key = start;

                mapping.set(key, []);
            }
            this.sessions.set(i, mapping);
        }
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

    addSession(session, dayNum) {
        if (dayNum < 0 || dayNum > 6) {
            throw new Error("Invalid day number. Please choose a valid day.");
        } else if (this.sessionScheduleCollides(dayNum, session.schedule)) {
            throw new Error("Another Session is already registered in the introduced hours. Please check the calendar for the valid free spaces.");
        }
        var daySchedule = this.sessions.get(dayNum);
        for (var start = session.schedule.initialHour; start < (session.schedule.initialHour + session.schedule.totalHours); start++) {
            let key = start;
            daySchedule.delete(key);
            daySchedule.set(key, [session]);
        }

        this.sessions.set(dayNum, daySchedule);

        let instructorName = session.instructor.firstName + " " + session.instructor.lastName;

        this.notify(instructorName, session);
    }

    getSessions(dayNum) {
        return this.sessions.get(dayNum);
    }

    sessionScheduleCollides(dayNum, schedule) {
        // Recordar que this.sessions lo que trae es un Map

        // daySchedules es un map, que tiene como valor un array de máximo un elemento.
        var daySchedules = this.sessions.get(dayNum);
        if (daySchedules.values().length > 0) {
            daySchedules.forEach((value, key) => {
                if ((key >= schedule.initialHour && key <= (schedule.initialHour + schedule.totalHours)) && value.length > 0) {
                    return true;
                }
            });
        }
        return false;
    }

    /*
    schedulesCollidese(schedule1, schedule2) {
        const firstSchedule = (schedule1.initialHour < schedule2.initialHour ? schedule1 : schedule2);
        const secondSchedule = (firstSchedule === schedule1 ? schedule2 : schedule1);        
        const lastHour = firstSchedule.initialHour + firstSchedule.totalHours - 1;
        if (lastHour < secondSchedule.initialHour) {
            return false;
        } else {
            return true;
        }
    }*/

    notify(instructorName, session) {
        this.room.updateCalendar(instructorName, session);
    }

    acceptVisit(instructorVisitor, day) {
        var listOfSessions = [];
        listOfSessions.push(instructorVisitor.visitMySessions(this, day));
        listOfSessions.push(instructorVisitor.visitOtherSessions(this, day));
        listOfSessions.push(instructorVisitor.visitFreeSpaces(this, day));

        //[[mySessions],[otherSessions],[freeSpaces]]
        return listOfSessions;
    }
}