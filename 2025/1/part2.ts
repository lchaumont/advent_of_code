const main = (input: string) => {
    const lines: string[] = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "");

    let dial = 50;
    let password = 0;

    for (const line of lines) {
        const sens = line[0];
        const number = parseInt(line.substring(1));

        const after = dial + (sens === "L" ? -1 : 1) * number;

        const s1 = Math.floor(dial / 100);
        const s2 = Math.floor(after / 100);

        password += Math.abs(s1 - s2);
        if (after % 100 === 0 && sens === "L") password++;
        if (dial % 100 === 0 && sens === "L") password--;

        dial = after;
    }

    console.log("Dial :", dial);
    return password;
};

export default main;
