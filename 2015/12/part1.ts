import {extractNumbers2} from "../../lib/string-utils";

const main = (input: string) => {
    return extractNumbers2(input).reduce((acc, cur) => acc + cur, 0);
};

export default main;
