const Instructor = require("./Instructor");
const FactoryUser = require("./FactoryUser");

module.exports = class FactoryInstructor extends FactoryUser { 
    
    createUser(email, password, id, firstName, lastName, phone) {
        console.log("Instructor created");
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