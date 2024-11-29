const main = (input: string) => {
    const lines: string[] = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "");

    const getRequirement = (mass: number): number => {
        const result = Math.floor(mass / 3) - 2;
        if (result <= 0) return 0;
        else return result + getRequirement(result);
    };

    const result = lines
        .map((v) => getRequirement(Number(v)))
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    console.log(result);
};

export default main;
