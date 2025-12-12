const main = (input: string) => {
    return input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "")
        .map((line: string) => {
            const r = line
                .replaceAll(/\\/g, "\\\\")
                .replaceAll(/\"/g, "\\\"")
                
            return r.length + 2 - line.length;
        })
        .reduce((acc, cur) => acc + cur, 0);
};

export default main;
