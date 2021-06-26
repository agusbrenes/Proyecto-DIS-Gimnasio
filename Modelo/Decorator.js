module.exports = class Decorator {
    constructor() {}

    decorate(listOfSessions) {
        //[[mySessions],[otherSessions],[freeSpaces]]
        var finalArray = [];

        listOfSessions.forEach(listA => {
            if (listA.length > 0) {
                for (var i = 0; i < 2; i++) {
                    if (i === 0) {
                        var mondongo = {
                            isModifyable: true,
                            session: listA[i]
                        };
                    }
                    var mondongo = {
                        isModifyable: false,
                        session: listA[i]
                    };

                    finalArray.push(mondongo);
                }
            }
        });

        //Esto definitivamente está bien. Estoy 45% seguro... creo
        finalArray.sort((element1, element2) => (element1.session.startHour > element2.session.startHour) ? 1 : -1);

        return finalArray;
    }
}