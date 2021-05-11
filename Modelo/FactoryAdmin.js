import Administrator from "./Administrator";
import FactoryUser from "./FactoryUser";

export default class FactoryAdmin extends FactoryUser { 
    
    createUser(email, password, id, firstName, lastName, phone) {
        console.log("Admin created");
        return new Administrator(email, password, id, firstName, lastName, phone);
    }
}