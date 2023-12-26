
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
                d[d.length - 1].unshift(0);
            } else {
                d[i].unshift(d[i][0] - d[i + 1][0]);
            }
        }

        data.push(d);
    }
    
    const sum = data.reduce((acc, val) => acc + val[0][0], 0);
    console.log(sum);
};

export default main;