import Instructor from './instructor';

export default class TempInstructor extends Instructor {
    constructor(email, password) {
        super(email, password);
        this.#is_working = false;
    }

    finalizeJob() {
        
    }

}