module.exports = class User {
    constructor(email, password, id, firstName, lastName, phone) {
        this.email = email;
        this.password = password;
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
    }

    setEmail(email) {
        this.email = email;
    }

    get getEmail() {
        return this.email;
    }

    setPassword(password) {
        this.password = password;
    }

    get getPassword() {
        return this.password;
    }

    setId(id) {
        this.id = id;
    }

    get getId() {
        return this.id;
    }    

    setFirstName(firstName) {
        this.firstName = firstName;
    }

    get getFirstName() {
        return this.firstName;
    }    

    setLastName(lastName) {
        this.lastName = lastName;
    }

    get getLastName() {
        return this.lastName;
    }    

    setPhone(phone) {
        this.phone = phone;
    }

    get getPhone() {
        return this.phone;
    }   

}