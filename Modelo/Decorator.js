module.exports = class Decorator {
    constructor() {}

    decorate(listOfSessions) {
        //[[mySessions],[otherSessions],[freeSpaces]]
        var finalArray = [];

        listOfSessions.forEach(listA => {
            if (listA.length > 0) {
                for (var i = 0; i < 2; i++) {
                    if (i === 0) {
                        let mondongo = {
                            isModifyable: true,
                            session: listA[i]
                        };
                    }
                    let mondongo = {
                        isModifyable: false,
                        session: listA[i]
                    };

                    finalArray.push(mondongo);
                }
            }
        });

        return finalArray;
    }
}