import _ from "lodash";

const main = (input) => {
    input = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line) => line.trim() !== "");

    const time = input[0].replaceAll("Time: ", "").replaceAll(/\s+/gm, "\s").split("\s").filter((time) => time !== "").join("");
    const distance = input[1].replaceAll("Distance: ", "").replaceAll(/\s+/gm, "\s").split("\s").filter((distance) => distance !== "").join("");

    console.log(time);
    console.log(distance);  

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

    console.log(numberOfWayToWin)
};

export default main;
