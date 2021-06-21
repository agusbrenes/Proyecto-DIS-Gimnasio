module.exports = class SessionRegisterStrategy {    
    createSession() {
        throw new Error("Cannot call abstract method 'createSession'. Instance a concrete SessionRegisterStrategy to call createSession().");
    }
}