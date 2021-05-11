import Instructor from "./Instructor";
import FactoryUser from "./FactoryUser";

export default class FactoryInstructor extends FactoryUser { 
    
    createUser(email, password, id, firstName, lastName, phone) {
        console.log("Instructor created");
        return new Instructor(email, password, id, firstName, lastName, phone);
    }
}