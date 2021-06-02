module.exports = class Dao {
    find(filter) {
        throw new Error("Abstract Method has no implementation");
    }

    save(object) {
        throw new Error("Abstract Method has no implementation");
    }

    delete(filter) {
        throw new Error("Abstract Method has no implementation");
    }

    modify(filter, object){
        throw new Error("Abstract Method has no implementation");
    }

    toMongoSchema(object) {
        throw new Error("Abstract Method has no implementation");
    }    
}