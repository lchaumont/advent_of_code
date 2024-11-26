const main = (input: string) => {
    let numbers: number[] = input.replaceAll("\r", "").split(",").map(Number);

    for (let i = 0; i< 80; i++) {
        let toAdd = 0;
        numbers = numbers.map((n, index) => {
            if (n === 0) {
                toAdd++;
                return 6;
            }
            else return n - 1;
        }); 

        for (let j = 0; j < toAdd; j++) {
            numbers.push(8);
        }
    }

    console.log(numbers.length);
};

export default main;
