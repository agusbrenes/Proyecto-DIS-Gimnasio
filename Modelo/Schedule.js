module.exports = class Schedule {
    static #id = 0;

    constructor(begin_time, end_time) {
        this.#id = Schedule.#assignId();
        this.#begin_time = begin_time;
        this.#end_time = end_time;
    }

    static #assignId() {
        return ++this.#id;
    }

    get getBeginTime() {
        return this.#begin_time;
    }

    /**
     * @param {Date} bt
     */
    set setBeginTime(bt) {
        this.#begin_time = bt;
    }

    get getEndTime() {
        return this.#end_time;
    }

    /**
     * @param {Date} et
     */
    set setEndTime(et) {
        return this.#end_time = et;
    }
}