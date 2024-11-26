const main = (input: string) => {
    const lines: string[] = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "");

    const result = lines
        .map((v) => Math.floor(Number(v) / 3) - 2)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    console.log(result);
};

export default main;
