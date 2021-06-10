module.exports = class Schedule {
    static #id = 0;

    constructor(begin_time, end_time) {
        this.id = Schedule.assignId();
        this.begin_time = begin_time;
        this.end_time = end_time;
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

    getBeginTime() {
        return this.begin_time;
    }

    setBeginTime(bt) {
        this.begin_time = bt;
    }

    getEndTime() {
        return this.end_time;
    }

    setEndTime(et) {
        return this.end_time = et;
    }
}