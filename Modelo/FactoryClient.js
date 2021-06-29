const Client = require("./Client");
const FactoryUser = require("./FactoryUser");

module.exports = class FactoryClient extends FactoryUser { 
    
    createUser(email, password, id, firstName, lastName, phone) {
        return new Client(
            email, 
            password, 
            id, 
            firstName, 
            lastName, 
            phone
        );
    }
}