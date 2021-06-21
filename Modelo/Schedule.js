module.exports = class Schedule {
    constructor(month, day, initialHour, totalHours) {
        this.month = month;
        this.day = day;
        this.initialHour = initialHour;
        this.totalHours = totalHours;
    }

    getMonth() {
        return this.month;
    }

    setMonth(month) {
        this.month = month;
    }

    getDay() {
        return this.day;
    }

    setDay(day) {
        this.day = day;
    }

    getInitialHour() {
        return this.initialHour;
    }

    setInitialHour(hour) {
        this.initialHour = hour;
    }

    getTotalHours() {
        return this.totalHours;
    }

    setTotalHours(hours) {
        this.totalHours = hours;
    }
}