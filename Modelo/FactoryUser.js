module.exports = class FactoryUser {
    constructor() {
        // if (this.constructor === FactoryUser) {
        //   throw new TypeError("Cannot construct abstract object type 'UserCreator', call for creation of a concrete type.");
        // }
    }  
    
    createUser() {
        throw new TypeError("Cannot create abstract object type 'User', call for creation of a concrete type.");
    }
}