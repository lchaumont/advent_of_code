const main = (input: string) => {
    return input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "")
        .map((line: string) => {
            const r = line
                .replaceAll(/\\[^x]/g, "a")
                .replaceAll(/\\x/g, "HEX")
                .replaceAll(/\"/g, "")
                .replaceAll(/HEX.{2}/g, "a");

            return line.length - r.length;
        })
        .reduce((acc, cur) => acc + cur, 0);
};

export default main;
