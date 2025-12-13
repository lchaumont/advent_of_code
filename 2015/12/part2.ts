const main = (input: string) => {
    const json = JSON.parse(input);

    const process = (sub: any): number => {
        if (Array.isArray(sub)) {
            return [...sub].reduce((acc, cur) => acc + process(cur), 0);
        } else if (typeof sub === "object") {
            const values = Object.values(sub) as any[];
            const skip = values.find((v) => v === "red") !== undefined;

            if (skip) return 0;

            return values.reduce((acc, cur) => acc + process(cur), 0);
        } else if (typeof sub === "number") {
            return sub;
        }

        return 0;
    };

    return process(json);
};

export default main;
