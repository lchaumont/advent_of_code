import fs from "fs";

const year = process.argv[2];
const day = process.argv[3];

async function input() {
    try {
        const f = fetch(`https://adventofcode.com/${year}/day/${day}/input`, {
            headers: {
                cookie: `session=${process.env.SESSION_COOKIE}`,
            },
        });

        let text = await (await f).text();

        // Remove trailing newline
        const lastChar = text[text.length - 1];
        if (lastChar === "\n") {
            text = text.slice(0, -1);
        }

        fs.writeFileSync(`./${year}/${day}/input.txt`, text);
    } catch (err) {
        console.log(err);
    }
}

input();
