var md5 = require("crypto-js/md5");

const main = (input: string) => {
    let i = 0;

    while (true) {
        const hash = md5(input + i).toString();

        if (hash.startsWith("000000")) {
            return i;
        }

        i++;
    }
};

export default main;