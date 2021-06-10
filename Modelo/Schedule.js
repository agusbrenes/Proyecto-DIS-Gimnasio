module.exports = class Schedule {
    static #id = 0;

    constructor(beginTime, endTime) {
        this.id = Schedule.assignId();
        this.beginTime = beginTime;
        this.endTime = endTime;
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
        return this.beginTime;
    }

    setBeginTime(bt) {
        this.beginTime = bt;
    }

    getEndTime() {
        return this.endTime;
    }

    setEndTime(et) {
        return this.endTime = et;
    }
}