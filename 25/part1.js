import _ from "lodash";

const main = (input) => {
    input = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line) => line.trim() !== "");

    const data = new Map();
    input.forEach((line) => {
        const [from, toUnformatted] = line.split(": ");
        const to = toUnformatted.split(" ");

        if (data.has(from)) {
            data.set(from, [...data.get(from), ...to]);
        } else {
            data.set(from, to);
        }

        for (const t of to) {
            if (data.has(t)) {
                data.set(t, [...data.get(t), from]);
            } else {
                data.set(t, [from]);
            }
        }
    });

    let graphBody = "";
    data.forEach((value, key) => {
        graphBody += `<node id="${key}" />`;
        value.forEach((v) => {
            graphBody += `<edge source="${key}" target="${v}" />`;
        });
    });

    // Build GRAPHML
    let graphml = `<?xml version="1.0" encoding="UTF-8"?>
    <graphml xmlns="http://graphml.graphdrawing.org/xmlns"  
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://graphml.graphdrawing.org/xmlns/1.0/graphml.xsd">
      <graph id="G" edgedefault="undirected">
        ${graphBody}
      </graph>
    </graphml>`;

    console.log(graphml);
};

export default main;
