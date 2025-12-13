import {compressString} from "../../lib/string-utils";

const main = (input: string) => {
    let str = input;
    for (let i = 0; i < 40; i++) {
        str = compressString(str);
    }
    return str.length;
};

export default main;
