import _ from "lodash";

const main = (input) => {
    input = input
        .replaceAll("\r", "")
        .split(",")

    console.log(input);

    function hashAlgorithm(step) {
        let current = 0;

        const chars = step.split("");
        for (const char of chars) {
            const pointCode = char.charCodeAt(0);
            current = current + pointCode;
            current = current * 17;
            current = current % 256;
        }

        return current;
    }

    let sum = 0;
    for (const step of input) {
        sum += hashAlgorithm(step);
    }
    console.log(sum);
};

export default main;
