import _ from "lodash";

const main = (input) => {
    input = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line) => line.trim() !== "");

    const times = input[0].replaceAll("Time: ", "").replaceAll(/\s+/gm, "\s").split("\s").filter((time) => time !== "");
    const distances = input[1].replaceAll("Distance: ", "").replaceAll(/\s+/gm, "\s").split("\s").filter((distance) => distance !== "");
    
    let factor = 1;
    for (let i = 0; i < times.length; i++) {
        const time = times[i];
        const distance = distances[i];

        let numberOfWayToWin = 0;

        let currentSpeed = 0;
        for (let j = 0; j < time + 1; j++) {
            let remainingTimeForRace = time - j;
            let maximumDistance = remainingTimeForRace * currentSpeed;

            if (maximumDistance > distance) {
                numberOfWayToWin++;
            }

            currentSpeed++;
        }

        factor *= numberOfWayToWin;
    }

    console.log(factor)
};

export default main;
