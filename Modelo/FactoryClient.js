import Client from "./Client";
import FactoryUser from "./FactoryUser";

export default class FactoryClient extends FactoryUser { 
    
    createUser(email, password, id, firstName, lastName, phone) {
        return new Client(email, password, id, firstName, lastName, phone);
    }
}