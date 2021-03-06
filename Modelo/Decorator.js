module.exports = class Decorator {
    constructor() {}

    decorate(listOfSessions) {
        //[[mySessions],[otherSessions],[freeSpaces]]
        var finalArray = [];

        for (var i = 0; i <= 2; i++) {
            if (listOfSessions[i].length > 0) {
                if (i === 0) {
                    listOfSessions[i].forEach(mySession => {
                        var mondongo = {
                            isModifyable: true,
                            color: "Blue",
                            session: mySession
                        };
                        finalArray.push(mondongo);
                    });
                } else if (i === 1) {
                    listOfSessions[i].forEach(notMySession => {
                        var candanga = {
                            isModifyable: false,
                            color: "Red",
                            session: notMySession
                        };
                        finalArray.push(candanga);
                    });
                } else {
                    listOfSessions[i].forEach(notMySession => {
                        var candanga = {
                            isModifyable: false,
                            color: "Green",
                            session: notMySession
                        };
                        finalArray.push(candanga);
                    });
                }
            }
        }

        //Esto definitivamente está bien. Estoy 45% seguro... creo
        finalArray.sort((element1, element2) => (element1.session.startHour > element2.session.startHour) ? 1 : -1);

        return finalArray;
    }
}