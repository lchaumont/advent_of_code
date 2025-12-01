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

        dial += ((sens === "L" ? -1 : 1) * number);
        if (dial % 100 === 0) password++;
    }

    console.log("Dial :", dial);
    return password;
};

export default main;