module.exports = class Dao {
    async find(filter) {
        throw new Error("Abstract Method has no implementation");
    }

    async save(object) {
        throw new Error("Abstract Method has no implementation");
    }

    async modify(filter, object){
        throw new Error("Abstract Method has no implementation");
    }

    async delete(filter) {
        throw new Error("Abstract Method has no implementation");
    }

    async getAll() {
        throw new Error("Abstract Method has no implementation");
    }

    toMongoSchema(object) {
        throw new Error("Abstract Method has no implementation");
    }    
}