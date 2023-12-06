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
    let step = 100000;

    let previousResult = false;
    for (let j = 0; j < time + 1; j+= step) {
        let remainingTimeForRace = time - j;
        let maximumDistance = remainingTimeForRace * currentSpeed;

        let iterationResult = maximumDistance > distance;

        if (iterationResult !== previousResult) {
            let innerLoopSpeed = currentSpeed - step;
            for (let k = j - step; k < j; k++) {
                let remainingTimeForRace = time - k;
                let maximumDistance = remainingTimeForRace * innerLoopSpeed;

                if (maximumDistance > distance) {
                    numberOfWayToWin++;
                }

                innerLoopSpeed++;
            }
        } else if (iterationResult) {
            numberOfWayToWin += step;
        }

        previousResult = iterationResult;
        currentSpeed += step;
    }

    console.log(numberOfWayToWin);
};

export default main;
