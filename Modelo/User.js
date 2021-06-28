module.exports = class User {
    constructor(email, password, id, firstName, lastName, phone) {
        this.email = email;
        this.password = password;
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.messages = [];
    }

    setEmail(email) {
        this.email = email;
    }

    getEmail() {
        return this.email;
    }

    setPassword(password) {
        this.password = password;
    }

    getPassword() {
        return this.password;
    }

    setId(id) {
        this.id = id;
    }

    getId() {
        return this.id;
    }    

    setFirstName(firstName) {
        this.firstName = firstName;
    }

    getFirstName() {
        return this.firstName;
    }    

    setLastName(lastName) {
        this.lastName = lastName;
    }

    getLastName() {
        return this.lastName;
    }    

    setPhone(phone) {
        this.phone = phone;
    }

    getPhone() {
        return this.phone;
    }   

    addMessage(text, session) {
        this.messages.push({
            msg: text, 
            session: session
        });
    }

}