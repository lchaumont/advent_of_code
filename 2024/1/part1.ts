const main = (input: string): number => {
    const left: number[] = [];
    const right: number[] = [];

    input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "")
        .forEach((line: string) => {
            const [l, r] = line.split("   ").map((x) => parseInt(x));
            left.push(l);
            right.push(r);
        });

    left.sort((a, b) => a - b);
    right.sort((a, b) => a - b);

    let answer = 0;

    for (let i = 0; i < left.length; i++) {
        answer += Math.abs(left[i] - right[i]);
    }

    return answer;
};

export default main;
