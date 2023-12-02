const { open } = require("node:fs/promises");

function isNumeric(str) {
    return !isNaN(str) && !isNaN(parseInt(str));
}

(async () => {
    const file = await open("./input.txt");

    let sum = 0;
    for await (const line of file.readLines()) {
        let chars = line.split("");
        chars = chars.filter((char) => isNumeric(char));

        const numbersJoined = chars[0] + chars[chars.length - 1];
        sum += parseInt(numbersJoined);
    }

    console.log(sum);
})();
