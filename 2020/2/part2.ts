const main = (input: string) => {
    const lines: string[] = input
        .replaceAll("\r", "")
        .replaceAll(":", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "");

    let count = 0;

    for (const line of lines) {
        const [rules, char, password] = line.split(" ");
        const [min, max] = rules.split("-");

        if ((password[Number(min) - 1] === char && password[Number(max) - 1] !== char) || (password[Number(min) - 1] !== char && password[Number(max) - 1] === char)) {
            count++;
        }
    }

    console.log(count);
};

export default main;
