const main = (input: string) => {
    const numbers: number[] = input
        .split(",")
        .map((nbr: string) => Number(nbr))
        .filter((nbr: number) => !isNaN(nbr));

    numbers.sort((a: number, b: number) => a - b);
    const min = numbers[0];
    const max = numbers[numbers.length - 1];
    
    let result = 0;

    for (let i = min; i <= max; i++) {
        let current_result = 0;

        numbers.forEach((nbr: number) => {
            current_result += sumZeroToN(Math.abs(i - nbr));
        });

        if (result === 0 || current_result < result) {
            result = current_result;
        }
        
        // console.log("Target : " + i + " - Result : " + current_result);
    }

    console.log("Part 2 : " + result);
};

const sumZeroToN = (n: number): number => n * (n + 1) / 2

export default main;
