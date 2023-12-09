
const main = (input) => {
    input = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line) => line.trim() !== "");

    function getNextStep(currentStep) {
        let nextStep = [];
        for (let i = 0; i < currentStep.length - 1; i++) {
            nextStep.push(currentStep[i + 1] - currentStep[i]);
        }
        return nextStep;
    }

    let data = [];
    for (const line of input) {
        let d = [];
        d.push(line.split(" ").map((x) => parseInt(x)));
        let currentStep = d[0];

        while (!currentStep.every((x) => x === 0)) {
            const nextStep = getNextStep(currentStep);
            currentStep = nextStep;
            d.push(nextStep);
        }


        for (let i = d.length - 1; i >= 0; i--) {
            if (i === d.length - 1) {
                d[d.length - 1].push(0);
            } else {
                d[i].push(d[i + 1][d[i + 1].length - 1] + d[i][d[i].length - 1]);
            }
        }

        data.push(d);
    }
    
    const sum = data.reduce((acc, val) => acc + val[0][val[0].length - 1], 0);
    console.log(sum);
};

export default main;
