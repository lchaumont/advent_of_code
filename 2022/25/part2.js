const main = (input) => {
    input = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line) => line.trim() !== "");

    console.log(input);

    for (const line of input) {
        const chars = line.split("");
        connsole.log(chars);

        let sum = 0;
        for (let i = chars.length; i > 0; i--) {
            const charValue = chars[i] === "-" ? -1 : chars[i] === "=" ? -2 : parseInt(chars[i]);

            connsole.log(charValue);
        }
    }
};

export default main;
