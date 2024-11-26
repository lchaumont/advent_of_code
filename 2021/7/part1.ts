const main = (input: string) => {
    const numbers: number[] = input
        .split(",")
        .map((nbr: string) => Number(nbr))
        .filter((nbr: number) => !isNaN(nbr));

    numbers.sort((a: number, b: number) => a - b);
    const middleIndex = Math.floor(numbers.length / 2);
    const target = numbers[middleIndex];

    let result = 0;

    numbers.forEach((nbr: number) => {
        result += Math.abs(target - nbr);
    });

    console.log("Part 1 : " + result);
};

export default main;