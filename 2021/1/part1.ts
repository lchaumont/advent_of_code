const main = (input: string) => {
    const lines: string[] = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "");

    const depths = lines.map(Number);

    let previousDepth: number | undefined = undefined;
    let countIncrease = 0;

    depths.forEach((depth: number) => {
        if (previousDepth && depth > previousDepth) {
            countIncrease++;
        }

        previousDepth = depth;
    });

    console.log(countIncrease);
};

export default main;
