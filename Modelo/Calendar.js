export default class Calendar {
    constructor(room, month, year) {
        if (month > 12) {
            throw new Error("Invalid Month number. Cannot create Calendar without valid Month number.");
        }
        this.#room = room;
        this.#month = month;        
        this.#monthName = this.#getMonthName();
        this.#year = year;
        this.days = new Map();
    }

    addDay(number) {
        if (number < 1 || number > 7) {
            throw new Error("Invalid Day number. Cannot add such Day.");
        }
        this.days.set(number, new Day(number));
    }

    get #getMonthName() {
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