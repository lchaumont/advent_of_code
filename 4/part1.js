const { open } = require("node:fs/promises");

(async () => {
    const file = await open("./input.txt");

    let sum = 0;
    for await (const line of file.readLines()) {
        const [_, draw] = line.split(/Card\s+\d+: /gm);
        const [w, m] = draw.split(/\s+\|\s+/gm);

        const ww = w.split(/\s+/gm).map(x => x.trim());
        const mm = m.split(/\s+/gm).map(x => x.trim());

        const winningNumbers = mm.filter(x => ww.includes(x)).map(x => parseInt(x));
        const score = winningNumbers.length !== 0 ? Math.pow(2, winningNumbers.length - 1) : 0;
        sum += score;

        console.log(winningNumbers, score);
    }

    console.log(sum);
})();
