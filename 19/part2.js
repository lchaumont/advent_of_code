const main = (input) => {
    input = input
        .replaceAll("\r", "")
        .split("\n\n")
        .map((x) => x.split("\n"));

    let [workflows, parts] = input;

    workflows = workflows.map((x) => {
        x = x.replaceAll("}", "");

        let [name, rules] = x.split("{");
        rules = rules.split(",");

        rules = rules.map((x, index) => {
            if (index === rules.length - 1) {
                return {condition: null, direction: x};
            }

            const [condition, direction] = x.split(":");
            return {condition, direction};
        });

        return {name, rules};
    });

    parts = parts.map((x) => {
        x = x.replaceAll("}", "");
        x = x.replaceAll("{", "");
        const values = x.split(",");
        const p = {};
        values.forEach((x) => {
            const [key, value] = x.split("=");
            p[key] = parseInt(value);
        });
        return p;
    });

    const inWorkflow = workflows.find((x) => x.name === "in");

    function getReturnForDirection(direction) {
        if (direction === "A") return true;
        else if (direction === "R") return false;
        else return workflows.find((x) => x.name === direction);
    }

    function executeWorkflow(workflow, part) {
        const {x, m, a, s} = part;
        const {name, rules} = workflow;

        for (const rule of rules) {
            if (rule.condition !== null && eval(rule.condition) === true) {
                return getReturnForDirection(rule.direction);
            } else if (rule.condition === null) {
                return getReturnForDirection(rule.direction);
            }
        }

        console.error("No rule found for", name, part);
        return false;
    }

    function collectDistinctRating(rating) {
        return [
            ...new Set(
                workflows
                    .map((x) => x.rules)
                    .flat()
                    .filter((x) => x.condition !== null && x.condition.includes(rating))
                    .map((x) => x.condition.replaceAll(/[<>]+/gi, "").replaceAll(rating, ""))
                    .map((x) => parseInt(x))
            ),
        ].sort((a, b) => a - b);
    }

    const distinctA = collectDistinctRating("a");
    const distinctM = collectDistinctRating("m");
    const distinctS = collectDistinctRating("s");
    const distinctX = collectDistinctRating("x");

    distinctA.unshift(0);
    distinctM.unshift(0);
    distinctS.unshift(0);
    distinctX.unshift(0);

    distinctA.push(4000);
    distinctM.push(4000);
    distinctS.push(4000);
    distinctX.push(4000);

    console.log(distinctA);
    console.log(distinctM);
    console.log(distinctS);
    console.log(distinctX);

    let sum = 0;
    for (let j = 0; j < distinctA.length - 1; j++) {
        const a = distinctA[j];
        const nextA = distinctA[j + 1];
        console.log("---- : " + j)
        for (let h = 0; h < distinctM.length - 1; h++) {
            const m = distinctM[h];
            const nextM = distinctM[h + 1];
            console.log("--- : " + h)
            for (let g = 0; g < distinctS.length - 1; g++) {
                const s = distinctS[g];
                const nextS = distinctS[g + 1];
                for (let i = 0; i < distinctX.length - 1; i++) {
                    const x = distinctX[i];
                    const nextX = distinctX[i + 1];

                    const part = {a : a + 0.5, m : m + 0.5, s : s + 0.5, x : x + 0.5};
                    let safeLoop = 0;
                    let currentWorkflow = inWorkflow;

                    while (currentWorkflow !== true && currentWorkflow !== false && safeLoop < 560) {
                        currentWorkflow = executeWorkflow(currentWorkflow, part);

                        safeLoop++;
                        if (safeLoop > 559) {
                            console.log("safeLoop");
                            break;
                        }
                    }

                    if (currentWorkflow === true) {
                        //console.log(a, nextA, "/", m, nextM, "/", s, nextS, "/", x, nextX);
                        sum = sum + (nextX - x) * (nextS - s) * (nextM - m) * (nextA - a);
                    }
                }
            }
        }
    }

    console.log(sum);
};

export default main;
