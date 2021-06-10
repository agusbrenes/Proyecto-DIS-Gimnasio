module.exports = class Calendar {
    static #id = 0;

    constructor(room, month, year) {
        if (month > 12) {
            throw new Error("Invalid Month number. Cannot create Calendar without valid Month number.");
        }
        this.id = Calendar.assignId();
        this.room = room;
        this.month = month;        
        this.monthName = this.getMonthName();
        this.year = year;
        this.days = new Map();
    }

    static assignId() {
        return ++this.#id;
    }

    setId(id) {
        this.id = id;
    }

    getId() {
        return this.id;
    }

    setRoom(room) {
        this.room = room;
    }

    getRoom() {
        return this.room;
    }

    setMonth(month) {
        this.month = month;
        this.monthName = this.getMonthName();
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

    setMonth(month) {
        this.month = month;
    }

    getMonth() {
        return this.month;
    }
    
    getDays() {
        return this.days;
    }

    getDay(num) {
        return this.days.get(num);
    }

    addDay(day) {
        this.days.set(day.getNumber(), day);
    }

    deleteDay(num) {
        if (this.days.get(num) == undefined) {
            throw new Error("This day isn't registered in the Calendar. Cannot perform delete operation.");
        }
        this.days.delete(num);
    }

    getMonthName() {
        switch (month) {
            case 1:
                return "January";
            case 2:
                return "February";
            case 3:
                return "March";
            case 4:
                return "April";
            case 5:
                return "May";
            case 6:
                return "June";
            case 7:
                return "July";
            case 8:
                return "August";
            case 9:
                return "September";
            case 10:
                return "October";
            case 11:
                return "November";
            case 12:
                return "December";
            default:
                throw new Error("Invalid Month number. Cannot create Calendar without valid Month number.");
        }
    }
}