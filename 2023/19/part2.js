import _ from "lodash";

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

        return {name, rules, usedTime: 0};
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

    const mapWorkflow = new Map();
    workflows.forEach((x) => mapWorkflow.set(x.name, x.rules));
    const inWorkflow = mapWorkflow.get("in");
    const possibleIntervals = [];

    function executeWorkflow(rules, pool) {
        if (rules.length === 1) {
            if (rules[0].direction === "A") {
                possibleIntervals.push(_.cloneDeep(pool));
                return;
            };
            if (rules[0].direction === "R") return;
            executeWorkflow(mapWorkflow.get(rules[0].direction), pool);
        } else {
            executeWorkflow([rules[0]], splitPool(pool, rules[0].condition));
            executeWorkflow(rules.slice(1), splitPool(pool, rules[0].condition, true));
        }
    }

    function splitPool(pool, condition, reversed = false) {
        const p = _.cloneDeep(pool);
        const variable = condition[0]; // a, m, s, x
        const operator = condition[1]; // <, >
        const value = parseInt(condition.slice(2));

        const interval = p[variable];
        if (!interval) return;

        if (reversed) {
            if (operator === ">") interval[1] = Math.min(interval[1], value);
            if (operator === "<") interval[0] = Math.max(interval[0], value);
        } else {
            if (operator === ">") interval[0] = Math.max(interval[0], value + 1);
            if (operator === "<") interval[1] = Math.min(interval[1], value - 1);
        }

        if (interval[0] > interval[1]) return;
        p[variable] = interval;
        return p;
    }

    executeWorkflow(inWorkflow, {x: [1, 4000], m: [1, 4000], a: [1, 4000], s: [1, 4000]});
    console.log(possibleIntervals);

    const result = possibleIntervals.map((interval) => {
        return (interval.x[1] - interval.x[0] + 1) * (interval.m[1] - interval.m[0] + 1) * (interval.a[1] - interval.a[0] + 1) * (interval.s[1] - interval.s[0] + 1); 
    }).reduce((a, b) => a + b, 0);

    console.log(result);
};

export default main;
