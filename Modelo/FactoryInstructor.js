const Instructor = require("./Instructor");
const FactoryUser = require("./FactoryUser");

module.exports = class FactoryInstructor extends FactoryUser { 
    
    createUser(email, password, id, firstName, lastName, phone) {
        return new Instructor(
            email, 
            password, 
            id, 
            firstName, 
            lastName, 
            phone
        );
    }
}