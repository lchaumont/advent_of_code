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

    let sum = 0;
    for (const part of parts) {
        let safeLoop = 0;
        let currentWorkflow = inWorkflow;

        while (currentWorkflow !== true && currentWorkflow !== false && safeLoop < 10000) {
            currentWorkflow = executeWorkflow(currentWorkflow, part);
            
            safeLoop++;
            if (safeLoop > 10000) {
                console.log("safeLoop");
                break;
            }
        }

        if (currentWorkflow === true) {
            sum = sum + part.x + part.m + part.a + part.s;
        }
    }

    console.log(sum);
};

export default main;
