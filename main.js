import fs from 'fs';

const day = process.argv[2];
const part = process.argv[3];
const isCustomFile = process.argv[4];

async function main() {
  try {
    const file = fs.readFileSync(
      `./${day}/${isCustomFile ? isCustomFile : 'input'}.txt`
    );
    const text = file.toString();

    const runner = await import(`./${day}/part${part}.js`);
    runner.default(text);
  } catch (err) {
    console.log(err);
  }
}

main();