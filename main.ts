import fs from "fs";

const year = process.argv[2];
const day = process.argv[3];
const part = process.argv[4];
const isCustomFile = process.argv[5];

async function main() {
    try {
        const file = fs.readFileSync(`./${year}/${day}/${isCustomFile ? isCustomFile : "input"}.txt`);
        const text = file.toString();

        const runner = await import(`./${year}/${day}/part${part}.ts`);
        const start = new Date().getTime();
        runner.default(text);
        const end = new Date().getTime();

        console.log(`Time: ${end - start}ms`);
    } catch (err) {
        console.log(err);
    }
}

main();