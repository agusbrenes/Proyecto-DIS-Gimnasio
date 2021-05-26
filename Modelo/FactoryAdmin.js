const Admin = require("./Admin");
const FactoryUser = require("./FactoryUser");

module.exports = class FactoryAdmin extends FactoryUser { 
    
    createUser(email, password, id, firstName, lastName, phone) {
        console.log("Admin created");
        return new Admin(email, password, id, firstName, lastName, phone);
    }
}