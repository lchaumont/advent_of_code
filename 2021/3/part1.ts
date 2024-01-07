const main = (input: string) => {
    const lines: string[] = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "");

    const map = new Map<number, number>();

    lines.forEach((line: string) => {
        const splitted = line.split("");
        for (let i  = 0; i < splitted.length; i++) {
            const char = splitted[i];
            if (char === "0") {
                map.set(i, (map.get(i) ?? 0) + 1)
            } else {    
                map.set(i, (map.get(i) ?? 0) - 1)
            }
        };
    })

    const gammaRateBinary = Array.from(map.values()).map((value: number) => value > 0 ? "0" : "1").join("");
    const gammaRate = parseInt(gammaRateBinary, 2);
    const epsilonRate = Math.pow(2, gammaRateBinary.length) - gammaRate - 1;

    console.log(`Gamma rate: ${gammaRate}`);
    console.log(`Epsilon rate: ${epsilonRate}`);
    console.log(gammaRate * epsilonRate)
};

export default main;