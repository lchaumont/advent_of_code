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

        return {name, rules, usedTime : 0};
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

    function getReturnForDirection(direction) {
        if (direction === "A") return true;
        else if (direction === "R") return false;
        else return mapWorkflow.get(direction);
    }

    function executeWorkflow(workflow, part) {
        const {x, m, a, s} = part;
        const rules = workflow;

        for (const rule of rules) {
            if (rule.condition === null) return getReturnForDirection(rule.direction);

            const variable = rule.condition[0];
            const operator = rule.condition[1];
            const value = rule.condition.substring(2);
            if (variable === "x" && operator === "<" && x < value) return getReturnForDirection(rule.direction);
            if (variable === "x" && operator === ">" && x > value) return getReturnForDirection(rule.direction);
            if (variable === "m" && operator === "<" && m < value) return getReturnForDirection(rule.direction);
            if (variable === "m" && operator === ">" && m > value) return getReturnForDirection(rule.direction);
            if (variable === "a" && operator === "<" && a < value) return getReturnForDirection(rule.direction);
            if (variable === "a" && operator === ">" && a > value) return getReturnForDirection(rule.direction);
            if (variable === "s" && operator === "<" && s < value) return getReturnForDirection(rule.direction);
            if (variable === "s" && operator === ">" && s > value) return getReturnForDirection(rule.direction);
        }
        
        return false;
    }

    function collectDistinctRating(rating) {
        return [
            ...new Set(
                workflows
                    .map((x) => x.rules)
                    .flat()
                    .filter((x) => x.condition !== null && x.condition.includes(rating))
                    .map((x) => x.condition.replaceAll(rating, ""))
                    .map((x) => {
                        const sign = x[0];
                        return parseInt(x.substring(1));
                    })
            ),
        ].sort((a, b) => a - b);
    }

    const mapWorkflow = new Map();
    workflows.forEach((x) => mapWorkflow.set(x.name, x.rules));
    const inWorkflow = mapWorkflow.get("in");

    const distinctA = collectDistinctRating("a");
    const distinctM = collectDistinctRating("m");
    const distinctS = collectDistinctRating("s");
    const distinctX = collectDistinctRating("x");

    distinctA.unshift(1);
    distinctM.unshift(1);
    distinctS.unshift(1);
    distinctX.unshift(1);

    distinctA.push(4000);
    distinctM.push(4000);
    distinctS.push(4000);
    distinctX.push(4000);

    console.log(distinctA);
    console.log(distinctM);
    console.log(distinctS);
    console.log(distinctX);

    let sum = 0;
    for (let j = 0; j < distinctA.length -1 ; j++) {
        const a = distinctA[j];
        const nextA = distinctA[j + 1];
        const fA = nextA - a;

        console.log("-------- ", j);

        for (let h = 0; h < distinctM.length - 1; h++) {
            const m = distinctM[h];
            const nextM = distinctM[h + 1];
            const fM = nextM - m;

            console.log("------ ", h);

            for (let g = 0; g < distinctS.length - 1; g++) {
                const s = distinctS[g];
                const nextS = distinctS[g + 1];
                const fS = nextS - s;

                for (let i = 0; i < distinctX.length - 1; i++) {
                    const x = distinctX[i];

                    const part = {a: a + 0.5, m: m + 0.5, s: s + 0.5, x: x + 0.5};
                    let safeLoop = 0;
                    let currentWorkflow = inWorkflow;

                    while (currentWorkflow !== true && currentWorkflow !== false && safeLoop < 560) {
                        currentWorkflow = executeWorkflow(currentWorkflow, part);
                        safeLoop++;
                    }

                    if (currentWorkflow === true) {
                        const nextX = distinctX[i + 1];
                        const fX = nextX - x;
                        
                        const factor = xLength * sLength * mLength * aLength;
                        sum = sum + factor;
                    }
                }
            }
        }
    }
    console.log(sum);
};

export default main;
