const main = (input: string) => {
    const lines: string[] = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "");

    const results: number[] = [];

    lines.forEach(l => {    
        let coord = {x: 0, y: 0};

        l.split(",").forEach(ins => {
            // const firstChar = ins.charAt(0);
            // if (firstChar === "R") coord.x = coord.x + Number(ins.substring(1));
            // if (firstChar === "L") coord.x = coord.x - Number(ins.substring(1));
            // if (firstChar === "U") coord.y = coord.y + Number(ins.substring(1));
            // if (firstChar === "D") coord.y = coord.y - Number(ins.substring(1)); 
        
            
        });
    });
};

export default main;
