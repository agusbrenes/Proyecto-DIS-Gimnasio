module.exports = class Schedule {
    constructor(beginTime, endTime) {
        this.beginTime = beginTime;
        this.endTime = endTime;
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