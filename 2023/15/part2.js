import _ from "lodash";

const main = (input) => {
    input = input.replaceAll("\r", "").split(",");

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

    const data = new Map();
    for (let i = 0; i < 256; i++) {
        data.set(i, new Map());
    }

    for (const step of input) {
        const [label, focalLength] = step.split(/[=-]/);
        const hash = hashAlgorithm(label);

        if (focalLength) {
            data.get(hash).set(label, parseInt(focalLength));
        } else {
            data.get(hash).delete(label);
        }
    }

    console.log(data);

    let sum = 0;
    data.forEach((value, boxNumber) => {
        if (value.size > 0) {
            let index = 0;
            value.forEach((focalLength, label) => {
                sum += (1 + boxNumber) * (index + 1) * focalLength;
                index++;
            });
        }
    });

    console.log(sum);
};

export default main;
