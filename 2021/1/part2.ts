const main = (input: string) => {
    const lines: string[] = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "");

    const depths = lines.map(Number);

    let previousSum: number | undefined = undefined;
    let countIncrease = 0;

    for (let i = 0; i < depths.length - 2; i++) {
        const nextSum = depths[i] + depths[i + 1] + depths[i + 2];

        if (previousSum && nextSum > previousSum) {
            countIncrease++;
        }

        previousSum = nextSum;
    }

    console.log(countIncrease);
};

export default main;
