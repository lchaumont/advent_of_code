import _ from "lodash";

const main = (input) => {
    input = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line) => line.trim() !== "");

    const data = input
        .map((line) => {
            if (line === "noop") return [0];
            else {
                const [_, number] = line.split(" ");
                return [0, parseInt(number)];
            }
        })
        .flat();

    let x = 1;
    let crt = [];
    let screen = [];

    for (let i = 0; i < data.length; i++) {
        if (i % 40 === 0) {
            screen.push(crt);
            crt = [];
        }

        const modulo = i % 40;

        if (modulo >= x - 1 && modulo <= x + 1) {
            crt.push("#");
        } else {
            crt.push(".");
        }

        x = x + data[i];
    }
    screen.push(crt);

    console.log(screen.map((line) => line.join("")).join("\n"));
};

export default main;
