import Instructor from "./Instructor";
import FactoryUser from "./FactoryUser";

export default class FactoryAdmin extends FactoryUser { 
    
    createUser(email, password, id, firstName, lastName, phone) {
        return new Instructor(email, password, id, firstName, lastName, phone);
    }
}