const { open } = require("node:fs/promises");

(async () => {
    const file = await open("./input.txt");

    for await (const line of file.readLines()) {
    }
})();
