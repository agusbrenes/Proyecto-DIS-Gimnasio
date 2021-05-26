module.exports = class Dao {
    find(filter) {
        throw new Error("Abstract Method has no implementation");
    }

    save(object) {
        throw new Error("Abstract Method has no implementation");
    }

    delete() {
        throw new Error("Abstract Method has no implementation");
    }

    modify(){
        throw new Error("Abstract Method has no implementation");
    }

    #toMongoSchema(object) {
        throw new Error("Abstract Method has no implementation");
    }    
}