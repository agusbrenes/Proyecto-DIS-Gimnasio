module.exports = class Controller {
    constructor(handler){
        this.handler = handler;
    }

    async find(filter) {
        return await this.handler.find(filter);
    }

    async save(object) {
        throw new Error("Abstract Method has no implementation");
    }

    async modify(filter, object){
        throw new Error("Abstract Method has no implementation");
    }

    async delete(filter) {
        return await this.handler.delete(filter);
    }

    async getAll() {
        return await this.handler.getAll();
    }
}