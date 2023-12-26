const { open } = require("node:fs/promises");

(async () => {
    const file = await open("./input.txt");

    const data = {};
    for (let i = 1; i < 202 + 1; i++) {
        data[i] = {
            count : 1,
            draw: undefined,
            matches: undefined
        };
    }

    for await (const line of file.readLines()) {
        const [_, index, draw] = line.split(/Card\s+(\d+): /gm);
        const drawIndex = parseInt(index);
        const [w, m] = draw.split(/\s+\|\s+/gm);
        
        const ww = w.split(/\s+/gm).map(x => x.trim());
        const mm = m.split(/\s+/gm).map(x => x.trim());

        const winningNumbers = mm.filter(x => ww.includes(x)).map(x => parseInt(x));

        data[drawIndex].draw = draw;
        data[drawIndex].matches = winningNumbers

        for (let i = 1; i < winningNumbers.length + 1; i++) {
            if (data[drawIndex + i] !== undefined) {
                data[drawIndex + i].count += data[drawIndex].count;
            }
        }
    }

    const reduced = Object.values(data).reduce((acc, cur) => acc + cur.count, 0);
    console.log(reduced);
})();
